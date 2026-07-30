import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://sajidos-portfolio.vercel.app';
const TODAY = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/skills', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/certifications', priority: '0.8', changefreq: 'monthly' },
  { path: '/photography', priority: '0.8', changefreq: 'monthly' },
  { path: '/content-creator', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

// Generate sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${DOMAIN}${r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml`;

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

console.log('✅ Generated sitemap.xml and robots.txt in public/ directory for domain:', DOMAIN);
