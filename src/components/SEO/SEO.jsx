import React from 'react';
import { Helmet } from 'react-helmet-async';

const DOMAIN = 'https://sajid-os-portfolio.vercel.app';
const DEFAULT_IMAGE = `${DOMAIN}/potraitnew.PNG`;

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohamed Sajid',
  alternateName: 'Sajid',
  url: DOMAIN,
  image: DEFAULT_IMAGE,
  jobTitle: 'Full Stack Web Developer & Content Creator',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance / Self-Employed',
  },
  sameAs: [
    'https://github.com/sajid05-jelly',
    'https://www.linkedin.com/in/mohamed-sajid',
    'https://www.instagram.com/srm_vipers',
  ],
  knowsAbout: [
    'Full Stack Web Development',
    'React.js',
    'Tailwind CSS',
    'JavaScript',
    'Three.js',
    'Content Creation',
    'Photography',
    'UI/UX Design',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SAJID OS Portfolio',
  alternateName: 'Sajid Portfolio',
  url: DOMAIN,
};

const SEO = ({
  title,
  description,
  keywords,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  customSchema = null,
}) => {
  const canonicalUrl = `${DOMAIN}${path === '/' ? '' : path}`;
  const fullTitle = title ? `${title} | SAJID OS` : 'SAJID OS | Mohamed Sajid - Full Stack Developer & Content Creator';
  const metaDescription =
    description ||
    'Personal interactive portfolio operating system of Mohamed Sajid. Full Stack Web Developer, Content Creator, and Photographer.';
  const metaKeywords =
    keywords ||
    'Mohamed Sajid, Sajid Portfolio, Full Stack Developer, React Developer, Web Developer, Content Creator, Photography, SRM Vipers';
  const imageUrl = image.startsWith('http') ? image : `${DOMAIN}${image.startsWith('/') ? '' : '/'}${image}`;

  const schemasToRender = [personSchema, websiteSchema];
  if (customSchema) {
    if (Array.isArray(customSchema)) {
      schemasToRender.push(...customSchema);
    } else {
      schemasToRender.push(customSchema);
    }
  }

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Mohamed Sajid" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="SAJID OS" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD Structured Data */}
      {schemasToRender.map((schemaObj, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaObj)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
