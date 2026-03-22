import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { defaultSidebarCategories, defaultSidebarProducts } from "../data/shopSidebar";
import { getCategoryProducts, getSidebarProducts } from "../lib/productsApi";

const tuBepProducts = [
  {
    category: "TỦ BẾP",
    name: "Tủ bếp gỗ sồi hiện đại cánh kính",
    oldPrice: "18.650.000",
    price: "17.900.000 VND",
    sale: "-4%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/3-1-300x300.jpg",
  },
  {
    category: "TỦ BẾP",
    name: "Tủ bếp chữ L phủ acrylic chống ẩm",
    oldPrice: "22.900.000",
    price: "21.480.000 VND",
    sale: "-6%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/4-1-300x300.jpg",
  },
  {
    category: "TỦ BẾP",
    name: "Tủ bếp mini cho căn hộ nhỏ",
    oldPrice: "11.850.000",
    price: "11.200.000 VND",
    sale: "-5%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/011-300x300.jpg",
  },
  {
    category: "TỦ BẾP",
    name: "Tủ bếp module thông minh có quầy bar",
    oldPrice: "27.900.000",
    price: "26.590.000 VND",
    sale: "-5%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/bg-300x300.jpg",
  },
  {
    category: "TỦ BẾP",
    name: "Tủ bếp chữ I kèm tủ kho cao",
    oldPrice: "20.300.000",
    price: "19.250.000 VND",
    sale: "-5%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/6-300x300.jpg",
  },
  {
    category: "TỦ BẾP",
    name: "Tủ bếp laminate chống xước",
    oldPrice: "24.500.000",
    price: "23.520.000 VND",
    sale: "-4%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/3616950-300x300.jpg",
  },
  {
    category: "TỦ BẾP",
    name: "Tủ bếp cao cấp kết hợp bàn đảo",
    oldPrice: "33.800.000",
    price: "31.990.000 VND",
    sale: "-5%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/bg02-300x300.jpg",
  },
  {
    category: "TỦ BẾP",
    name: "Tủ bếp gỗ tự nhiên phong cách Bắc Âu",
    oldPrice: "29.400.000",
    price: "28.650.000 VND",
    sale: "-3%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/5-300x300.jpg",
  },
];

export default function TuBepPage() {
  const [products, setProducts] = useState(tuBepProducts);
  const [sidebarProducts, setSidebarProducts] = useState(defaultSidebarProducts);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      const [remoteProducts, remoteSidebar] = await Promise.all([
        getCategoryProducts("tu-bep"),
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
      <div className="container shop-container">
        <div className="shop-title-wrap reveal">
          <p className="shop-breadcrumb">
            <Link to="/">TRANG CHỦ</Link>
            <span>/</span>
            <span>TỦ BẾP</span>
          </p>
          <div className="shop-title-row">
            <h1>TỦ BẾP</h1>
            <p>Xem tất cả {products.length} kết quả</p>
          </div>
        </div>

        <div className="shop-content-grid">
          <aside className="shop-sidebar reveal delay-1">
            <div className="shop-sidebar-inner">
              <section className="sidebar-widget">
                <h3 className="widget-title">DANH MỤC SẢN PHẨM</h3>
                <div className="widget-divider" />
                <ul className="widget-menu-list">
                  {defaultSidebarCategories.map((item) => (
                    <li key={item.label} className={item.to === "/tu-bep" ? "active" : ""}>
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
                      Giá: <strong>20,198,000 ₫</strong> - <strong>23,120,000 ₫</strong>
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
