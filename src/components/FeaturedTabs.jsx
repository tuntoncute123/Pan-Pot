import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { featuredCarouselProducts } from "../data/products";

export default function FeaturedTabs() {
  const [page, setPage] = useState(0);
  const perPage = 5;
  const pageCount = Math.ceil(featuredCarouselProducts.length / perPage);

  const visibleProducts = useMemo(() => {
    const start = page * perPage;
    return featuredCarouselProducts.slice(start, start + perPage);
  }, [page]);

  const nextPage = () => {
    setPage((current) => (current + 1) % pageCount);
  };

  const prevPage = () => {
    setPage((current) => (current - 1 + pageCount) % pageCount);
  };

  return (
    <section id="featured" className="section sec-sp-noi-bat">
      <div className="container">
        <div className="section-featured-title reveal">
          <button type="button" className="title-button">
            <span>SẢN PHẨM NỔI BẬT</span>
          </button>
        </div>

        <div className="featured-carousel reveal">
          <button type="button" className="carousel-nav prev" aria-label="Sản phẩm trước" onClick={prevPage}>
            ‹
          </button>

          <div className="featured-products-grid">
            {visibleProducts.map((product, index) => (
              <ProductCard key={`${product.name}-${index}`} product={product} />
            ))}
          </div>

          <button type="button" className="carousel-nav next" aria-label="Sản phẩm tiếp theo" onClick={nextPage}>
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
