import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getProductDetail } from "../lib/productsApi";
import { useCart } from "../context/CartContext";

function toVnd(value) {
  return Number(value || 0).toLocaleString("vi-VN") + " ₫";
}

function extractNumber(value) {
  const numberValue = Number(String(value || "").replace(/[^\d]/g, ""));
  return Number.isFinite(numberValue) ? numberValue : 0;
}

function slugToTitle(value) {
  return String(value || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function mapStateProduct(product) {
  const priceNumber = extractNumber(product.price);
  const image = product.image || "https://via.placeholder.com/720x720?text=Product";

  return {
    id: product.id || "",
    slug: product.slug || "",
    name: product.name || "Sản phẩm",
    category: product.category || "Khác",
    brand: "Đang cập nhật",
    price: priceNumber,
    priceText: product.price || toVnd(priceNumber),
    salePercent: extractNumber(product.sale),
    salePrice: null,
    salePriceText: "",
    description: "Sản phẩm đang được cập nhật mô tả chi tiết.",
    details: "Thông tin chi tiết sẽ được cập nhật sớm.",
    inStock: true,
    stock: 0,
    rating: 0,
    reviewCount: 0,
    sold: 0,
    material: "Đang cập nhật",
    capacity: "Đang cập nhật",
    color: "Đang cập nhật",
    weight: "Đang cập nhật",
    origin: "Đang cập nhật",
    warranty: "Đang cập nhật",
    suitableFor: "Đang cập nhật",
    badges: [],
    images: [image],
    updatedAt: "Vừa cập nhật",
  };
}

export default function ProductDetailPage() {
  const { productKey } = useParams();
  const location = useLocation();
  const stateProduct = location.state?.product;
  const { addToCart } = useCart();

  const [product, setProduct] = useState(stateProduct ? mapStateProduct(stateProduct) : null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addSuccess, setAddSuccess] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProductDetail() {
      const remoteProduct = await getProductDetail(productKey);

      if (!isMounted) {
        return;
      }

      if (remoteProduct) {
        setProduct(remoteProduct);
      } else if (stateProduct) {
        setProduct(mapStateProduct(stateProduct));
      }

      setIsLoading(false);
    }

    loadProductDetail();

    return () => {
      isMounted = false;
    };
  }, [productKey, stateProduct]);

  const pageTitle = useMemo(() => {
    if (product?.name) {
      return product.name;
    }

    return slugToTitle(productKey);
  }, [product, productKey]);

  if (isLoading) {
    return (
      <section className="section product-detail-page">
        <div className="container">
          <div className="product-detail-loading">Đang tải chi tiết sản phẩm...</div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="section product-detail-page">
        <div className="container">
          <article className="product-detail-empty">
            <h1>Không tìm thấy sản phẩm</h1>
            <p>Sản phẩm bạn đang tìm có thể đã bị xóa hoặc chưa được công khai.</p>
            <Link to="/" className="product-detail-back">
              Quay về trang chủ
            </Link>
          </article>
        </div>
      </section>
    );
  }

  const mainImage = product.images?.[0] || "https://via.placeholder.com/720x720?text=Product";

  function handleAddToCart() {
    addToCart(
      {
        id: product.id || product.slug || product.name,
        slug: product.slug,
        name: product.name,
        image: mainImage,
        category: product.category,
        price: product.salePrice || product.price,
        priceText: product.salePriceText || product.priceText,
      },
      quantity
    );

    setAddSuccess("Đã thêm sản phẩm vào giỏ hàng.");
    window.setTimeout(() => {
      setAddSuccess("");
    }, 1800);
  }

  return (
    <section className="section product-detail-page">
      <div className="container">
        <p className="product-detail-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <strong>{pageTitle}</strong>
        </p>

        <article className="product-detail-card reveal">
          <div className="product-detail-grid">
            <div className="product-detail-media">
              <div className="product-detail-main-image" style={{ backgroundImage: `url(${mainImage})` }} />
              {product.images.length > 1 ? (
                <div className="product-detail-thumbs">
                  {product.images.slice(0, 4).map((img) => (
                    <img key={img} src={img} alt={product.name} />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="product-detail-info">
              <p className="product-detail-category">{product.category}</p>
              <h1>{pageTitle}</h1>
              <p className="product-detail-brand">Thương hiệu: {product.brand}</p>

              <div className="product-detail-prices">
                <strong>{product.salePriceText || product.priceText}</strong>
                {product.salePriceText ? <span>{product.priceText}</span> : null}
                {product.salePercent ? <em>-{product.salePercent}%</em> : null}
              </div>

              <div className="product-detail-actions">
                <label>
                  Số lượng
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                  />
                </label>
                <button type="button" onClick={handleAddToCart} disabled={!product.inStock}>
                  Thêm vào giỏ hàng
                </button>
                <Link to="/gio-hang" className="go-to-cart">
                  Xem giỏ hàng
                </Link>
              </div>

              {addSuccess ? <p className="product-detail-add-success">{addSuccess}</p> : null}

              <p className="product-detail-desc">{product.description}</p>

              <div className="product-detail-status-row">
                <span className={product.inStock ? "in-stock" : "out-stock"}>
                  {product.inStock ? "Còn hàng" : "Tạm hết hàng"}
                </span>
                <span>Đã bán: {product.sold.toLocaleString("vi-VN")}</span>
                <span>Cập nhật: {product.updatedAt}</span>
              </div>

              {product.badges.length ? (
                <div className="product-detail-badges">
                  {product.badges.map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="product-detail-meta">
            <h2>Thông số sản phẩm</h2>
            <div className="product-detail-meta-grid">
              <p>
                <strong>Chất liệu:</strong> {product.material}
              </p>
              <p>
                <strong>Dung tích:</strong> {product.capacity}
              </p>
              <p>
                <strong>Màu sắc:</strong> {product.color}
              </p>
              <p>
                <strong>Khối lượng:</strong> {product.weight}
              </p>
              <p>
                <strong>Xuất xứ:</strong> {product.origin}
              </p>
              <p>
                <strong>Bảo hành:</strong> {product.warranty}
              </p>
              <p>
                <strong>Phù hợp:</strong> {product.suitableFor}
              </p>
              <p>
                <strong>Đánh giá:</strong> {product.rating}/5 ({product.reviewCount} lượt)
              </p>
              <p>
                <strong>Tồn kho:</strong> {product.stock.toLocaleString("vi-VN")}
              </p>
            </div>
          </div>

          <div className="product-detail-content">
            <h2>Mô tả chi tiết</h2>
            <p>{product.details}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
