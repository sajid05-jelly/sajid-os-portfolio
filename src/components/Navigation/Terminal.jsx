import React, { useState, useRef, useEffect } from 'react';

const Terminal = () => {
  const [history, setHistory] = useState(['SAJID OS Easter Egg Console', 'Type "help" to explore hidden protocols.']);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, `> ${input}`];
      
      switch (cmd) {
        case 'help':
          newHistory.push('Commands: help, clear, whoami, reboot, origin');
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'whoami':
          newHistory.push('Guest (Access Level: Observer)');
          break;
        case 'origin':
          newHistory.push('System initialized in a retro-futuristic timeline.');
          break;
        case 'reboot':
          window.location.reload();
          break;
        case '':
          break;
        default:
          newHistory.push(`Unknown command: ${cmd}`);
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    const term = document.getElementById('hidden-terminal');
    term?.addEventListener('click', handleClick);
    return () => term?.removeEventListener('click', handleClick);
  }, []);

  return (
    <div id="hidden-terminal" className="hidden absolute bottom-12 right-12 w-[400px] h-64 bg-[#EAE7DF] border border-os-black/20 text-os-black font-mono p-6 overflow-y-auto z-[100] shadow-2xl pointer-events-auto rounded-sm backdrop-blur-md">
      <div className="absolute top-0 left-0 w-full h-1 bg-os-accent/80"></div>
      {history.map((line, i) => (
        <div key={i} className="text-xs mb-1 opacity-80">{line}</div>
      ))}
      <div className="flex text-xs mt-2">
        <span className="mr-2 text-os-accent">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent outline-none flex-1 text-os-black font-bold"
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default Terminal;
