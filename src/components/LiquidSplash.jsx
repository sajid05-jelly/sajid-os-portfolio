import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ========================================================
// PRODUCTION-QUALITY GLSL SHADERS (Navier-Stokes Pipeline)
// ========================================================

const baseVertex = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

// 1. ADVECTION PASS (Moves fluid density/velocity along velocity vectors)
const advectFrag = `
precision highp float;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
varying vec2 vUv;

void main() {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    gl_FragColor = texture2D(uSource, coord) * dissipation;
}
`;

// 2. SPLAT PASS (Injects mouse velocity and color density)
const splatFrag = `
precision highp float;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
varying vec2 vUv;

void main() {
    vec2 p = vUv - point;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
}
`;

// 3. VORTICITY PASS (Calculates local rotation/curl)
const vorticityFrag = `
precision highp float;
uniform sampler2D uVelocity;
uniform vec2 texelSize;
varying vec2 vUv;

void main() {
    float L = texture2D(uVelocity, vUv - vec2(texelSize.x, 0.0)).y;
    float R = texture2D(uVelocity, vUv + vec2(texelSize.x, 0.0)).y;
    float T = texture2D(uVelocity, vUv + vec2(0.0, texelSize.y)).x;
    float B = texture2D(uVelocity, vUv - vec2(0.0, texelSize.y)).x;
    float curl = R - L - (T - B);
    gl_FragColor = vec4(curl, 0.0, 0.0, 1.0);
}
`;

// 4. VORTICITY CONFINEMENT PASS (Preserves detailed swirling eddies)
const confinementFrag = `
precision highp float;
uniform sampler2D uVelocity;
uniform sampler2D uVorticity;
uniform vec2 texelSize;
uniform float dt;
uniform float curlFactor;
varying vec2 vUv;

void main() {
    float L = texture2D(uVorticity, vUv - vec2(texelSize.x, 0.0)).x;
    float R = texture2D(uVorticity, vUv + vec2(texelSize.x, 0.0)).x;
    float T = texture2D(uVorticity, vUv + vec2(0.0, texelSize.y)).x;
    float B = texture2D(uVorticity, vUv - vec2(0.0, texelSize.y)).x;
    float C = texture2D(uVorticity, vUv).x;
    
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    float len = length(force) + 0.0001;
    force = vec2(force.y, -force.x) / len;
    
    vec2 vel = texture2D(uVelocity, vUv).xy;
    gl_FragColor = vec4(vel + force * C * curlFactor * dt, 0.0, 1.0);
}
`;

// 5. DIVERGENCE PASS (Measures velocity compression)
const divergenceFrag = `
precision highp float;
uniform sampler2D uVelocity;
uniform vec2 texelSize;
varying vec2 vUv;

void main() {
    float L = texture2D(uVelocity, vUv - vec2(texelSize.x, 0.0)).x;
    float R = texture2D(uVelocity, vUv + vec2(texelSize.x, 0.0)).x;
    float T = texture2D(uVelocity, vUv + vec2(0.0, texelSize.y)).y;
    float B = texture2D(uVelocity, vUv - vec2(0.0, texelSize.y)).y;
    
    vec2 C = texture2D(uVelocity, vUv).xy;
    if (vUv.x - texelSize.x < 0.0) { L = -C.x; }
    if (vUv.x + texelSize.x > 1.0) { R = -C.x; }
    if (vUv.y - texelSize.y < 0.0) { B = -C.y; }
    if (vUv.y + texelSize.y > 1.0) { T = -C.y; }
    
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}
`;

// 6. PRESSURE PASS (Poisson Solver - Jacobi Iterations)
const pressureFrag = `
precision highp float;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
uniform vec2 texelSize;
varying vec2 vUv;

void main() {
    float L = texture2D(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, texelSize.y)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, texelSize.y)).x;
    float div = texture2D(uDivergence, vUv).x;
    
    float pressure = (L + R + T + B - div) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}
`;

// 7. GRADIENT SUBTRACTION PASS (Makes fluid velocity incompressible)
const gradientSubtractFrag = `
precision highp float;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
uniform vec2 texelSize;
varying vec2 vUv;

void main() {
    float L = texture2D(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, texelSize.y)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, texelSize.y)).x;
    
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    
    gl_FragColor = vec4(velocity, 0.0, 1.0);
}
`;

// 8. FINAL DISPLAY PASS (Warp background text, blend colors, keep background transparent)
const displayFrag = `
precision highp float;
uniform sampler2D uTexture;    // Background Typography texture ("MOHAMED SAJID")
uniform sampler2D uDensity;    // Fluid colors FBO
uniform sampler2D uVelocity;   // Physical velocity FBO
varying vec2 vUv;

void main() {
    vec4 density = texture2D(uDensity, vUv);
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    
    // Physical refraction warp on background text coordinates
    vec2 warpedUv = vUv - velocity * 0.06;
    
    // Chromatic aberration based on displacement force
    float ca = 0.035 * length(velocity);
    float r = texture2D(uTexture, warpedUv + vec2(ca, 0.0)).r;
    float g = texture2D(uTexture, warpedUv).g;
    float b = texture2D(uTexture, warpedUv - vec2(ca, 0.0)).b;
    float a = texture2D(uTexture, warpedUv).a;
    vec3 textWarped = vec3(r, g, b);
    
    float densityAmt = clamp(length(density.rgb), 0.0, 1.0);
    
    // Blend the fluid density color into the background text
    vec3 compositeColor = mix(textWarped, density.rgb, densityAmt * 0.45);
    
    // Strictly mask by the background typography alpha to keep empty space 100% transparent
    gl_FragColor = vec4(compositeColor, a);
}
`;

// ==========================================
// RENDER TARGET UTILS
// ==========================================

const createFBO = (w, h) => {
  return new THREE.WebGLRenderTarget(w, h, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: THREE.HalfFloatType,
    depthBuffer: false,
    stencilBuffer: false
  });
};

const createDoubleFBO = (w, h) => {
  return {
    read: createFBO(w, h),
    write: createFBO(w, h),
    swap: function() {
      let temp = this.read;
      this.read = this.write;
      this.write = temp;
    }
  };
};

// ==========================================
// WebGL2 FLUID CANVAS ENGINE
// ==========================================

const FluidPlane = ({ mouseRef }) => {
  const { gl, size, viewport } = useThree();
  const [typographyTexture, setTypographyTexture] = useState(null);
  
  // Auditing WebGL2 capability
  useEffect(() => {
    const isWebGL2 = gl.capabilities.isWebGL2;
    if (!isWebGL2) {
      console.error("WebGL2 support is unavailable. This advanced fluid simulation requires WebGL2 Framebuffer precision.");
    }
  }, [gl]);

  // Simulation resolution: 512 grid
  const simRes = { w: 512, h: 512 };
  
  // FBO References
  const velocityRef = useRef(null);
  const densityRef = useRef(null);
  const pressureRef = useRef(null);
  const divergenceRef = useRef(null);
  const vorticityRef = useRef(null);
  
  // Materials and Quads
  const matsRef = useRef({});
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1));
  const quadRef = useRef(null);
  const displayMatRef = useRef(null);
  
  const lastMouse = useRef({ x: 0.5, y: 0.5 });
  const goldColor = new THREE.Vector3(1.0, 0.84, 0.0);      // #FFD700
  const peachColor = new THREE.Vector3(1.0, 0.78, 0.6);     // #FFC89A
  const maroonColor = new THREE.Vector3(0.5, 0.0, 0.0);     // #800000

  // Canvas text generation: "MOHAMED SAJID" replacing "DIGITAL ARTIST"
  useEffect(() => {
    const generateTexture = async () => {
      await document.fonts.ready;
      const canvas = document.createElement('canvas');
      canvas.width = size.width * 2;
      canvas.height = size.height * 2;
      const ctx = canvas.getContext('2d');
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const vw = canvas.width / 2;
      const fontSize = vw * 0.12 * 2; 
      
      ctx.fillStyle = '#1A1918';
      ctx.globalAlpha = 0.15; // Same faded background style
      ctx.font = `900 ${fontSize}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      
      const startX = canvas.width * 0.05;
      const startY = canvas.height * 0.35;
      ctx.fillText('MOHAMED', startX, startY);
      
      ctx.font = `italic 900 ${fontSize}px "Space Grotesk", sans-serif`;
      ctx.fillText('SAJID', startX + fontSize * 0.8, startY + fontSize * 0.8);

      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
      setTypographyTexture(tex);
    };
    generateTexture();
  }, [size]);

  // Initializing buffers and shaders
  useEffect(() => {
    velocityRef.current = createDoubleFBO(simRes.w, simRes.h);
    densityRef.current = createDoubleFBO(simRes.w, simRes.h);
    pressureRef.current = createDoubleFBO(simRes.w, simRes.h);
    divergenceRef.current = createFBO(simRes.w, simRes.h);
    vorticityRef.current = createFBO(simRes.w, simRes.h);
    
    const createMat = (frag, uniforms) => new THREE.ShaderMaterial({
      vertexShader: baseVertex,
      fragmentShader: frag,
      uniforms: uniforms,
      depthWrite: false,
      depthTest: false
    });

    matsRef.current = {
      advect: createMat(advectFrag, {
        uVelocity: { value: null }, uSource: { value: null },
        texelSize: { value: new THREE.Vector2(1/simRes.w, 1/simRes.h) },
        dt: { value: 0.016 }, dissipation: { value: 0.98 } 
      }),
      splat: createMat(splatFrag, {
        uTarget: { value: null }, aspectRatio: { value: size.width/size.height },
        color: { value: new THREE.Vector3() }, point: { value: new THREE.Vector2() },
        radius: { value: 0.01 }
      }),
      vorticity: createMat(vorticityFrag, {
        uVelocity: { value: null },
        texelSize: { value: new THREE.Vector2(1/simRes.w, 1/simRes.h) }
      }),
      confinement: createMat(confinementFrag, {
        uVelocity: { value: null }, uVorticity: { value: null },
        texelSize: { value: new THREE.Vector2(1/simRes.w, 1/simRes.h) },
        dt: { value: 0.016 }, curlFactor: { value: 12.0 } 
      }),
      divergence: createMat(divergenceFrag, {
        uVelocity: { value: null },
        texelSize: { value: new THREE.Vector2(1/simRes.w, 1/simRes.h) }
      }),
      pressure: createMat(pressureFrag, {
        uPressure: { value: null }, uDivergence: { value: null },
        texelSize: { value: new THREE.Vector2(1/simRes.w, 1/simRes.h) }
      }),
      gradient: createMat(gradientSubtractFrag, {
        uPressure: { value: null }, uVelocity: { value: null },
        texelSize: { value: new THREE.Vector2(1/simRes.w, 1/simRes.h) }
      })
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    quadRef.current = new THREE.Mesh(geometry, matsRef.current.splat);
    sceneRef.current.add(quadRef.current);
    
    return () => {
      sceneRef.current.remove(quadRef.current);
      geometry.dispose();
      Object.values(matsRef.current).forEach(m => m.dispose());
    };
  }, [size]);

  const blit = (target, material) => {
    quadRef.current.material = material;
    gl.setRenderTarget(target);
    gl.render(sceneRef.current, cameraRef.current);
  };

  useFrame((state, delta) => {
    if (!velocityRef.current || !displayMatRef.current || !typographyTexture) return;
    
    const vel = velocityRef.current;
    const den = densityRef.current;
    const div = divergenceRef.current;
    const pres = pressureRef.current;
    const vort = vorticityRef.current;
    const mats = matsRef.current;
    
    const targetMouse = mouseRef.current;
    const dx = targetMouse.x - lastMouse.current.x;
    const dy = targetMouse.y - lastMouse.current.y;
    const speed = Math.sqrt(dx*dx + dy*dy);
    
    const dt = Math.min(delta, 0.016);
    
    // 1. INJECT VELOCITY & DENSITY (SPLAT)
    if (speed > 0.0005) {
      let activeColor = goldColor;
      const rand = Math.random();
      if (rand < 0.5) activeColor = goldColor;
      else if (rand < 0.8) activeColor = peachColor;
      else activeColor = maroonColor;
      
      const dynamicRadius = 0.08 + (speed * 0.15); 
      
      mats.splat.uniforms.uTarget.value = vel.read.texture;
      mats.splat.uniforms.point.value.set(targetMouse.x, 1.0 - targetMouse.y);
      mats.splat.uniforms.color.value.set(dx * 50.0, -dy * 50.0, 0.0);
      mats.splat.uniforms.radius.value = dynamicRadius;
      blit(vel.write, mats.splat);
      vel.swap();
      
      mats.splat.uniforms.uTarget.value = den.read.texture;
      mats.splat.uniforms.color.value.copy(activeColor).multiplyScalar(4.0);
      mats.splat.uniforms.radius.value = dynamicRadius;
      blit(den.write, mats.splat);
      den.swap();
    }
    
    lastMouse.current = { x: targetMouse.x, y: targetMouse.y };
    
    // 2. ADVECTION
    mats.advect.uniforms.uVelocity.value = vel.read.texture;
    mats.advect.uniforms.dt.value = dt;
    
    mats.advect.uniforms.uSource.value = vel.read.texture;
    mats.advect.uniforms.dissipation.value = 0.98; 
    blit(vel.write, mats.advect);
    vel.swap();
    
    mats.advect.uniforms.uSource.value = den.read.texture;
    mats.advect.uniforms.dissipation.value = 0.94; 
    blit(den.write, mats.advect);
    den.swap();
    
    // 3. VORTICITY CONFINEMENT
    mats.vorticity.uniforms.uVelocity.value = vel.read.texture;
    blit(vort, mats.vorticity);
    
    mats.confinement.uniforms.uVelocity.value = vel.read.texture;
    mats.confinement.uniforms.uVorticity.value = vort.texture;
    mats.confinement.uniforms.dt.value = dt;
    blit(vel.write, mats.confinement);
    vel.swap();
    
    // 4. DIVERGENCE
    mats.divergence.uniforms.uVelocity.value = vel.read.texture;
    blit(div, mats.divergence);
    
    // 5. PRESSURE
    gl.setRenderTarget(pres.read); gl.clear();
    mats.pressure.uniforms.uDivergence.value = div.texture;
    for (let i = 0; i < 8; i++) {
      mats.pressure.uniforms.uPressure.value = pres.read.texture;
      blit(pres.write, mats.pressure);
      pres.swap();
    }
    
    // 6. GRADIENT SUBTRACT
    mats.gradient.uniforms.uPressure.value = pres.read.texture;
    mats.gradient.uniforms.uVelocity.value = vel.read.texture;
    blit(vel.write, mats.gradient);
    vel.swap();
    
    // 7. DISPLAY FINAL OUTPUT
    gl.setRenderTarget(null);
    displayMatRef.current.uniforms.uDensity.value = den.read.texture;
    displayMatRef.current.uniforms.uVelocity.value = vel.read.texture;
    displayMatRef.current.uniforms.uTexture.value = typographyTexture;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 1, 1]} />
      <shaderMaterial 
        ref={displayMatRef}
        vertexShader={baseVertex}
        fragmentShader={displayFrag}
        uniforms={{ 
          uTexture: { value: null },
          uDensity: { value: null }, 
          uVelocity: { value: null } 
        }}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
};

export const LiquidSplash = ({ mouseRef }) => {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <FluidPlane mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
};
