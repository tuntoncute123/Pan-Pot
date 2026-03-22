import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir, writeFile } from "node:fs/promises";
import {
  DEFAULT_SITE_NAME,
  getSeoForPath,
  normalizeBaseUrl,
  publicRoutes,
} from "../src/seo/siteSeoConfig.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, "..");
const publicDir = path.join(workspaceRoot, "public");
const prerenderDir = path.join(publicDir, "prerender");

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildSitemapXml(siteUrl) {
  const rows = publicRoutes
    .map((route) => {
      const loc = `${siteUrl}${route.path === "/" ? "/" : route.path}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
}

function buildRobotsTxt(siteUrl) {
  return `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

function buildPrerenderHtml({ siteUrl, routePath, title, description }) {
  const canonical = `${siteUrl}${routePath === "/" ? "/" : routePath}`;
  const links = publicRoutes
    .slice(0, 8)
    .map((route) => {
      const href = route.path;
      const label = getSeoForPath(route.path).title.split("|")[0].trim();
      return `<li><a href="${href}">${escapeHtml(label)}</a></li>`;
    })
    .join("\n        ");

  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
</head>
<body>
  <main>
    <h1>${escapeHtml(title.split("|")[0].trim())}</h1>
    <p>${escapeHtml(description)}</p>
    <p>Đây là bản prerender tĩnh hỗ trợ bot tìm kiếm. Truy cập giao diện đầy đủ tại <a href="${routePath}">${canonical}</a>.</p>
    <nav aria-label="Liên kết nội bộ">
      <h2>Danh mục nổi bật</h2>
      <ul>
        ${links}
      </ul>
    </nav>
  </main>
</body>
</html>
`;
}

async function generateSeoAssets() {
  const siteUrl = normalizeBaseUrl(process.env.VITE_SITE_URL || process.env.SITE_URL || "https://your-domain.com");

  await mkdir(publicDir, { recursive: true });
  await mkdir(prerenderDir, { recursive: true });

  const sitemapXml = buildSitemapXml(siteUrl);
  const robotsTxt = buildRobotsTxt(siteUrl);

  await writeFile(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
  await writeFile(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");

  const prerenderWrites = publicRoutes.map(async (route) => {
    const seo = getSeoForPath(route.path);
    const slug = route.path === "/" ? "home" : route.path.replace(/^\//, "").replaceAll("/", "-");
    const html = buildPrerenderHtml({
      siteUrl,
      routePath: route.path,
      title: seo.title,
      description: seo.description,
    });

    await writeFile(path.join(prerenderDir, `${slug}.html`), html, "utf8");
  });

  await Promise.all(prerenderWrites);

  process.stdout.write(
    `Generated robots.txt, sitemap.xml, and prerender snapshots for ${publicRoutes.length} routes.\nSite URL: ${siteUrl}\nSite name: ${DEFAULT_SITE_NAME}\n`
  );
}

generateSeoAssets().catch((error) => {
  console.error("Failed to generate SEO assets", error);
  process.exitCode = 1;
});
