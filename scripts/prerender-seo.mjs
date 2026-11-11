/**
 * Build-time HTML snapshots for public SEO landing pages.
 * Runs after Vite builds the SPA. React takes over #root on the client.
 * No browser or extra runtime dependency required.
 */
import { createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const ORIGIN = 'https://steamoracleaning.com';
const pages = [
  ['/', 'home'], ['/about', 'about'], ['/services', 'services'],
  ['/carpet-cleaning', 'service-carpet'], ['/sofa-cleaning', 'service-sofa'],
  ['/upholstery-cleaning', 'service-upholstery'], ['/mattress-cleaning', 'service-mattress'],
  ['/blind-cleaning', 'service-blind'], ['/rug-cleaning', 'service-rug'],
  ['/service-areas', 'service-areas'], ['/faq', 'faq'], ['/contact', 'contact'],
];
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const root = process.cwd();
const server = await createServer({
  configFile: resolve(root, 'vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});
try {
  const { getPageSeo } = await server.ssrLoadModule('/src/utils/seo.ts');
  const { SERVICES } = await server.ssrLoadModule('/src/data/servicesData.ts');
  const { FAQS } = await server.ssrLoadModule('/src/data/faqsData.ts');
  const { MELBOURNE_SUBURBS } = await server.ssrLoadModule('/src/data/suburbsData.ts');
  const template = await readFile(resolve(root, 'dist/index.html'), 'utf8');
  const nav = '<nav aria-label="Cleaning services">' +
    '<a href="/">Home</a> · <a href="/services">All services</a> · ' +
    SERVICES.map(s => '<a href="/' + escapeHtml(s.slug) + '">' + escapeHtml(s.shortTitle) + '</a>').join(' · ') +
    ' · <a href="/service-areas">Service areas</a> · <a href="/contact">Contact</a></nav>';
  for (const [path, route] of pages) {
    const seo = getPageSeo(route);
    const service = SERVICES.find(s => path === '/' + s.slug);
    let details = '';
    if (service) {
      details = '<p>' + escapeHtml(service.heroDescription) + '</p>' +
        '<h2>Our ' + escapeHtml(service.shortTitle) + ' process</h2>' +
        '<ol>' + service.processSteps.map(s => '<li><strong>' + escapeHtml(s.title) + '</strong>: ' + escapeHtml(s.description) + '</li>').join('') + '</ol>' +
        '<h2>What is included</h2><ul>' + service.features.map(s => '<li>' + escapeHtml(s) + '</li>').join('') + '</ul>';
    } else if (route === 'home' || route === 'services') {
      details = '<h2>Professional cleaning services</h2><ul>' +
        SERVICES.map(s => '<li><a href="/' + escapeHtml(s.slug) + '">' + escapeHtml(s.title) + '</a>: ' + escapeHtml(s.tagline) + '</li>').join('') + '</ul>';
    } else if (route === 'service-areas') {
      details = '<h2>Melbourne suburbs we serve</h2><ul>' +
        MELBOURNE_SUBURBS.map(s => '<li>' + escapeHtml(s.name) + ' (' + escapeHtml(s.postcode) + ')</li>').join('') + '</ul>';
    } else if (route === 'faq') {
      details = '<h2>Common cleaning questions</h2>' +
        FAQS.slice(0, 12).map(f => '<h3>' + escapeHtml(f.question) + '</h3><p>' + escapeHtml(f.answer) + '</p>').join('');
    } else {
      details = '<p>' + escapeHtml(seo.description) + '</p>';
    }
    const content = '<div class="seo-static-snapshot"><header>' + nav + '</header><main><h1>' +
      escapeHtml(seo.title) + '</h1><p>' + escapeHtml(seo.description) + '</p>' + details +
      '<p><a href="/contact">Contact STEAMORA Cleaning</a></p></main></div>';
    const canonical = ORIGIN + (seo.canonicalPath || path);
    let html = template
      .replace(/<title>[^<]*<\/title>/, '<title>' + escapeHtml(seo.title) + '</title>')
      .replace(/<meta name="description" content="[^"]*"\s*\/>/, '<meta name="description" content="' + escapeHtml(seo.description) + '" />')
      .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, '<meta property="og:title" content="' + escapeHtml(seo.ogTitle || seo.title) + '" />')
      .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, '<meta property="og:description" content="' + escapeHtml(seo.ogDescription || seo.description) + '" />')
      .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, '<link rel="canonical" href="' + escapeHtml(canonical) + '" />')
      .replace('<div id="root"></div>', '<div id="root">' + content + '</div>');
    if (seo.ogImage) html = html.replace(/<meta property="og:image" content="[^"]*"\s*\/>/, '<meta property="og:image" content="' + ORIGIN + escapeHtml(seo.ogImage) + '" />');
    const dir = path === '/' ? resolve(root, 'dist') : join(root, 'dist', path.slice(1));
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, 'index.html'), html);
    console.log('SEO snapshot: ' + path);
  }
} finally {
  await server.close();
}
