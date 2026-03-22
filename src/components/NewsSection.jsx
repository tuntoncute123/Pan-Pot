import { useMemo, useState } from "react";
import { topBrandLogos } from "../data/products";

export default function NewsSection() {
  const [page, setPage] = useState(0);

  const perPage = useMemo(() => {
    if (typeof window === "undefined") {
      return 7;
    }

    if (window.innerWidth <= 700) {
      return 2;
    }

    if (window.innerWidth <= 1024) {
      return 3;
    }

    return 7;
  }, []);

  const pageCount = Math.ceil(topBrandLogos.length / perPage);
  const currentItems = useMemo(() => {
    const start = page * perPage;
    return topBrandLogos.slice(start, start + perPage);
  }, [page, perPage]);

  const handleNext = () => {
    setPage((current) => (current + 1) % pageCount);
  };

  const handlePrev = () => {
    setPage((current) => (current - 1 + pageCount) % pageCount);
  };

  return (
    <section id="news" className="section sec-top-brand">
      <div className="container">
        <div className="section-featured-title reveal brand-title-wrap">
          <button type="button" className="title-button brand-title">
            <span>THƯƠNG HIỆU HÀNG ĐẦU</span>
          </button>
        </div>

        <div className="brand-slider-shell reveal">
          <button type="button" className="brand-nav prev" aria-label="Thương hiệu trước" onClick={handlePrev}>
            {"<"}
          </button>

          <div className="brand-logo-grid">
            {currentItems.map((logo, index) => (
              <a href={logo} className="brand-logo-card" key={`${logo}-${index}`}>
                <img src={logo} alt="Thương hiệu" loading="lazy" />
              </a>
            ))}
          </div>

          <button type="button" className="brand-nav next" aria-label="Thương hiệu tiếp theo" onClick={handleNext}>
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
}
