import { Link } from "react-router-dom";

function slugify(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProductCard({ product }) {
  const detailKey = String(product.slug || product.id || slugify(product.name) || "san-pham");
  const detailPath = `/san-pham/${encodeURIComponent(detailKey)}`;

  return (
    <article className="product-card reveal">
      <div className="product-image-wrap">
        {product.sale ? <span className="sale-badge">{product.sale}</span> : null}
        <Link
          to={detailPath}
          state={{ product }}
          className="product-image-link"
          aria-label={`Xem chi tiết ${product.name}`}
        >
          <div className="product-image" style={{ backgroundImage: `url(${product.image})` }} />
        </Link>
      </div>
      <div className="product-content">
        <p className="product-cat">{product.category}</p>
        <h4>
          <Link to={detailPath} state={{ product }} className="product-name-link">
            {product.name}
          </Link>
        </h4>
        <div className="prices">
          <span className="old">{product.oldPrice}</span>
          <span className="price">{product.price}</span>
        </div>
        <Link to={detailPath} state={{ product }} className="add-btn">
          Xem chi tiết
        </Link>
      </div>
    </article>
  );
}
