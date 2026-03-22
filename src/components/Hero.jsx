import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  { label: "Tủ Bếp", href: "/tu-bep" },
  { label: "Bàn Ăn", href: "/ban-an" },
  { label: "Ghế Ăn", href: "/ghe-an" },
  { label: "Tủ Lạnh", href: "/tu-lanh" },
  { label: "Lò Vi Sóng", href: "/lo-vi-song" },
  { label: "Các Loại Bếp", href: "/cac-loai-bep" },
  { label: "Máy Hút Mùi", href: "/may-hut-mui" },
  { label: "Đèn Nhà Bếp", href: "/den-nha-bep" },
  { label: "Các Máy Khác", href: "/cac-may-khac" },
  { label: "Phụ Kiện Nhà Bếp", href: "/phu-kien-nha-bep" },
  { label: "Chậu Rửa-Vòi Rửa", href: "/chau-rua-voi-rua" },
];

const slideImages = [
  "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/baner.jpg",
  "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/baner2.jpg",
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goNext = () => {
    setActiveSlide((prev) => (prev + 1) % slideImages.length);
  };

  const goPrev = () => {
    setActiveSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  return (
    <section id="hero" className="section sec-banner">
      <div className="container banner-shell">
        <div className="banner-grid">
          <aside className="vertical-menu" aria-label="Danh mục sản phẩm">
            <ul>
              {categories.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("/") && !item.href.includes("#") ? (
                    <Link to={item.href}>{item.label}</Link>
                  ) : (
                    <a href={item.href}>{item.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          <div className="banner-right">
            <div className="main-slider">
              {slideImages.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt="Banner nội thất bếp"
                  className={`slide-image ${index === activeSlide ? "active" : ""}`}
                />
              ))}

              <button className="slider-btn prev" type="button" aria-label="Slide trước" onClick={goPrev}>
                ‹
              </button>
              <button className="slider-btn next" type="button" aria-label="Slide sau" onClick={goNext}>
                ›
              </button>

              <div className="slider-dots">
                {slideImages.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    type="button"
                    className={`dot ${index === activeSlide ? "active" : ""}`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Chuyển đến slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="sub-banners">
              <a href="#" className="sub-banner-card">
                <img
                  src="https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/km.jpg"
                  alt="Khuyến mãi quà tặng"
                />
              </a>
              <a href="#" className="sub-banner-card">
                <img
                  src="https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/dsf.jpg"
                  alt="Khuyến mãi quà tặng 100%"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
