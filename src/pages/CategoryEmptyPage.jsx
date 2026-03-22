import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { defaultSidebarCategories, defaultSidebarProducts } from "../data/shopSidebar";
import { getCategoryProducts, getSidebarProducts } from "../lib/productsApi";

function formatVnd(value) {
  return Number(value || 0).toLocaleString("vi-VN") + " ₫";
}

function extractPriceNumber(priceText) {
  const numeric = Number(String(priceText || "").replace(/[^\d]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

export default function CategoryEmptyPage({ title, activePath, categorySlug }) {
  const [products, setProducts] = useState([]);
  const [sidebarProducts, setSidebarProducts] = useState(defaultSidebarProducts);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      const [remoteProducts, remoteSidebar] = await Promise.all([
        getCategoryProducts(categorySlug),
        getSidebarProducts(),
      ]);

      if (!isMounted) {
        return;
      }

      if (remoteProducts.length) {
        setProducts(remoteProducts);
      }

      if (remoteSidebar.length) {
        setSidebarProducts(remoteSidebar);
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [categorySlug]);

  const [minPriceText, maxPriceText] = useMemo(() => {
    if (!products.length) {
      return ["0 ₫", "0 ₫"];
    }

    const values = products.map((item) => extractPriceNumber(item.price)).filter((value) => value > 0);

    if (!values.length) {
      return ["0 ₫", "0 ₫"];
    }

    const min = Math.min(...values);
    const max = Math.max(...values);

    return [formatVnd(min), formatVnd(max)];
  }, [products]);

  return (
    <section className="section shop-page">
      <div className="container shop-container tw-max-lg:tw-px-2">
        <div className="shop-page-title">
          <div className="shop-title-inner">
            <div className="shop-title-left">
              <p className="shop-breadcrumb">
                <Link to="/">Trang chủ</Link>
                <span>/</span>
                <span>{title}</span>
              </p>
            </div>

            <div className="shop-title-right">
              <button
                type="button"
                className="mobile-filter-toggle d-lg-none tw-inline-flex tw-items-center tw-gap-2 tw-rounded tw-border tw-border-slate-300 tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-font-semibold tw-text-slate-700"
                onClick={() => setShowSidebar((prev) => !prev)}
              >
                Lọc
              </button>
              <p className="shop-result-count">Xem tất cả {products.length} kết quả</p>
              <select className="shop-order-select" defaultValue="menu_order" aria-label="Sắp xếp sản phẩm">
                <option value="menu_order">Thứ tự mặc định</option>
                <option value="popularity">Thứ tự theo mức độ phổ biến</option>
                <option value="rating">Thứ tự theo điểm đánh giá</option>
                <option value="date">Thứ tự theo sản phẩm mới</option>
                <option value="price">Thứ tự theo giá: thấp đến cao</option>
                <option value="price-desc">Thứ tự theo giá: cao xuống thấp</option>
              </select>
            </div>
          </div>
        </div>

        <div className="shop-content-grid tw-max-lg:tw-gap-3">
          <aside className={`shop-sidebar reveal delay-1 ${showSidebar ? "d-block" : "d-none"} d-lg-block`}>
            <div className="shop-sidebar-inner">
              <section className="sidebar-widget">
                <h3 className="widget-title">DANH MỤC SẢN PHẨM</h3>
                <div className="widget-divider" />
                <ul className="widget-menu-list">
                  {defaultSidebarCategories.map((item) => (
                    <li key={item.label} className={item.to === activePath ? "active" : ""}>
                      <Link to={item.to}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="sidebar-widget">
                <h3 className="widget-title">LỌC THEO GIÁ</h3>
                <div className="widget-divider" />

                <div className="price-filter-widget">
                  <div className="price-slider-mock" aria-hidden="true">
                    <div className="price-slider-range" />
                    <span className="price-handle left" />
                    <span className="price-handle right" />
                  </div>

                  <div className="price-filter-row">
                    <button type="button" className="price-filter-button">
                      LỌC
                    </button>
                    <p className="price-label-text">
                      Giá: <strong>{minPriceText}</strong> - <strong>{maxPriceText}</strong>
                    </p>
                  </div>
                </div>
              </section>

              <section className="sidebar-widget">
                <h3 className="widget-title">SẢN PHẨM</h3>
                <div className="widget-divider" />
                <ul className="widget-product-list">
                  {sidebarProducts.map((product) => (
                    <li key={product.title}>
                      <a href="#" className="widget-product-link">
                        <img src={product.image} alt={product.title} />
                        <div>
                          <span className="widget-product-title">{product.title}</span>
                          <p className="widget-product-price">
                            <span>{product.oldPrice}</span>
                            <strong>{product.price}</strong>
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </aside>

          <div className="shop-products reveal delay-2">
            {products.length ? (
              <div className="shop-products-grid">
                {products.map((product) => (
                  <div key={product.id || product.name} className="shop-product-item">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="shop-empty-state">
                <h2>Chưa có sản phẩm</h2>
                <p>Danh mục này hiện chưa có sản phẩm. Vui lòng quay lại sau.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}