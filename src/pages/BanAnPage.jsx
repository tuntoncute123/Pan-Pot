import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { defaultSidebarCategories, defaultSidebarProducts } from "../data/shopSidebar";
import { getCategoryProducts, getSidebarProducts } from "../lib/productsApi";

const banAnProducts = [
  {
    category: "BÀN ĂN",
    name: "Bộ bàn ăn 6 ghế biznoithat BA-013a",
    oldPrice: "15,698,000",
    price: "15,247,000 ₫",
    sale: "-3%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/9-300x300.jpg",
  },
  {
    category: "BÀN ĂN",
    name: "Bộ bàn ăn 6 ghế xuất khẩu Nhật biznoithat BG-137B",
    oldPrice: "11,098,000",
    price: "10,980,000 ₫",
    sale: "-1%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/3-1-300x300.jpg",
  },
  {
    category: "BÀN ĂN",
    name: "Bộ bàn ăn xuất khẩu Nhật biznoithat BG-145",
    oldPrice: "8,575,000",
    price: "8,256,000 ₫",
    sale: "-4%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/1469154434561_2757654-300x300.jpg",
  },
  {
    category: "BÀN ĂN",
    name: "Bộ bàn ghế ăn",
    oldPrice: "3,569,000",
    price: "3,398,000 ₫",
    sale: "-5%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/8-300x300.jpg",
  },
  {
    category: "BÀN ĂN",
    name: "Bộ bàn ghế ăn gỗ cao su",
    oldPrice: "5,050,000",
    price: "4,956,000 ₫",
    sale: "-2%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/5-300x300.jpg",
  },
  {
    category: "BÀN ĂN",
    name: "Bộ bàn ghế ăn gỗ cao su Mango",
    oldPrice: "7,855,000",
    price: "7,658,000 ₫",
    sale: "-3%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/7-300x300.jpg",
  },
  {
    category: "BÀN ĂN",
    name: "Bộ bàn ghế ăn gỗ sồi Nga",
    oldPrice: "9,589,000",
    price: "9,267,000 ₫",
    sale: "-3%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/6-300x300.jpg",
  },
  {
    category: "BÀN ĂN",
    name: "Bộ bàn ghế ăn gỗ xoan đào",
    oldPrice: "6,549,000",
    price: "6,324,000 ₫",
    sale: "-3%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/4-1-300x300.jpg",
  },
];

export default function BanAnPage() {
  const [products, setProducts] = useState(banAnProducts);
  const [sidebarProducts, setSidebarProducts] = useState(defaultSidebarProducts);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      const [remoteProducts, remoteSidebar] = await Promise.all([
        getCategoryProducts("ban-an"),
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
  }, []);

  return (
    <section className="section shop-page">
      <div className="container shop-container tw-max-lg:tw-px-2">
        <div className="shop-page-title">
          <div className="shop-title-inner">
            <div className="shop-title-left">
              <p className="shop-breadcrumb">
                <Link to="/">Trang chủ</Link>
                <span>/</span>
                <span>Bàn Ăn</span>
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
                    <li key={item.label} className={item.to === "/ban-an" ? "active" : ""}>
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
                      Giá: <strong>3,398,000 ₫</strong> - <strong>15,247,000 ₫</strong>
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
            <div className="shop-products-grid">
              {products.map((product) => (
                <div key={product.name} className="shop-product-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}