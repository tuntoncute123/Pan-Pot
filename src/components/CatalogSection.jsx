import { useState } from "react";
import ProductCard from "./ProductCard";
import { categorySections, tabLabels } from "../data/products";

export default function CatalogSection() {
  const [activeTabs, setActiveTabs] = useState(() =>
    categorySections.reduce((acc, section) => {
      acc[section.key] = "new";
      return acc;
    }, {})
  );

  const selectTab = (sectionKey, tabKey) => {
    setActiveTabs((current) => ({
      ...current,
      [sectionKey]: tabKey,
    }));
  };

  return (
    <section id="catalog" className="section section-catalog-tabs">
      <div className="container catalog-tabs-stack">
        {categorySections.map((section, blockIndex) => {
          const activeTab = activeTabs[section.key] || "new";
          const products = section.tabs[activeTab] || [];

          return (
            <article
              key={section.key}
              className={`catalog-tab-block ${section.color} reveal ${
                blockIndex === 1 ? "delay-1" : ""
              } ${blockIndex === 2 ? "delay-2" : ""}`}
            >
              <div className="catalog-tab-head">
                <h4>{section.title}</h4>
                <ul className="catalog-tab-nav" role="tablist" aria-label={`Bộ lọc ${section.title}`}>
                  {tabLabels.map((tab) => (
                    <li key={`${section.key}-${tab.key}`}>
                      <button
                        type="button"
                        className={activeTab === tab.key ? "active" : ""}
                        onClick={() => selectTab(section.key, tab.key)}
                      >
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`catalog-tab-body ${section.promoOnLeft ? "promo-left" : "promo-right"}`}>
                <a href="#" className="catalog-promo-image" aria-label={`Danh mục ${section.title}`}>
                  <img src={section.promoImage} alt={section.title} loading="lazy" />
                </a>

                <div className="catalog-products-grid">
                  {products.slice(0, 8).map((product, productIndex) => (
                    <div key={`${section.key}-${product.name}-${productIndex}`} className="catalog-product-item">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
