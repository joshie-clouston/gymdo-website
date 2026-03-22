import type { APIRoute } from 'astro';
export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  const body = `
User-agent: *
Allow: /

# AI Crawlers - Allow for AEO
User-agent: GPTBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

# Block scrapers with no citation value
User-agent: Bytespider
Disallow: /
User-agent: CCBot
Disallow: /
User-agent: meta-externalagent
Disallow: /

Sitemap: ${sitemapURL.href}
`.trim();
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
