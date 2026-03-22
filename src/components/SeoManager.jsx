import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE_PATH,
  DEFAULT_SITE_NAME,
  getBreadcrumbItems,
  getSeoForPath,
  normalizeBaseUrl,
} from "../seo/siteSeoConfig.mjs";

function upsertMetaByName(name, content) {
  if (!content) {
    return;
  }

  let element = document.head.querySelector(`meta[name=\"${name}\"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertMetaByProperty(property, content) {
  if (!content) {
    return;
  }

  let element = document.head.querySelector(`meta[property=\"${property}\"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (!href) {
    return;
  }

  let element = document.head.querySelector(`link[rel=\"${rel}\"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let element = document.head.querySelector(`#${id}`);
  if (!element) {
    element = document.createElement("script");
    element.setAttribute("id", id);
    element.setAttribute("type", "application/ld+json");
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

function getBaseUrl() {
  const envSiteUrl = import.meta.env.VITE_SITE_URL;
  const rawBaseUrl = envSiteUrl || window.location.origin;

  return normalizeBaseUrl(rawBaseUrl);
}

export default function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname || "/";
    const seo = getSeoForPath(pathname);
    const siteUrl = getBaseUrl();
    const pageUrl = `${siteUrl}${pathname === "/" ? "" : pathname}`;
    const imageUrl = `${siteUrl}${DEFAULT_IMAGE_PATH}`;

    document.title = seo.title;

    upsertMetaByName("description", seo.description || DEFAULT_DESCRIPTION);
    upsertMetaByName("keywords", seo.keywords || "noi that bep, tu bep, ban an");
    upsertMetaByName("robots", seo.noindex ? "noindex, nofollow" : "index, follow");

    upsertMetaByProperty("og:type", "website");
    upsertMetaByProperty("og:locale", "vi_VN");
    upsertMetaByProperty("og:site_name", DEFAULT_SITE_NAME);
    upsertMetaByProperty("og:title", seo.title);
    upsertMetaByProperty("og:description", seo.description || DEFAULT_DESCRIPTION);
    upsertMetaByProperty("og:url", pageUrl);
    upsertMetaByProperty("og:image", imageUrl);

    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", seo.title);
    upsertMetaByName("twitter:description", seo.description || DEFAULT_DESCRIPTION);
    upsertMetaByName("twitter:image", imageUrl);

    upsertLink("canonical", pageUrl);

    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: DEFAULT_SITE_NAME,
      url: siteUrl,
      logo: imageUrl,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+84-0313-728-397",
        areaServed: "VN",
        availableLanguage: ["Vietnamese"],
      },
    };

    const webPageData = {
      "@context": "https://schema.org",
      "@type": seo.type || "WebPage",
      name: seo.title,
      description: seo.description || DEFAULT_DESCRIPTION,
      url: pageUrl,
      inLanguage: "vi-VN",
      isPartOf: {
        "@type": "WebSite",
        name: DEFAULT_SITE_NAME,
        url: siteUrl,
      },
    };

    const breadcrumbItems = getBreadcrumbItems(pathname).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "/" : item.path}`,
    }));

    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    };

    upsertJsonLd("seo-org-schema", organizationData);
    upsertJsonLd("seo-page-schema", webPageData);
    upsertJsonLd("seo-breadcrumb-schema", breadcrumbData);
  }, [location.pathname]);

  return null;
}
