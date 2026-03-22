export default function ProductCard({ product }) {
  return (
    <article className="product-card reveal">
      <div className="product-image-wrap">
        {product.sale ? <span className="sale-badge">{product.sale}</span> : null}
        <div className="product-image" style={{ backgroundImage: `url(${product.image})` }} />
      </div>
      <div className="product-content">
        <p className="product-cat">{product.category}</p>
        <h4>{product.name}</h4>
        <div className="prices">
          <span className="old">{product.oldPrice}</span>
          <span className="price">{product.price}</span>
        </div>
        <button className="add-btn" type="button">
          Thêm vào giỏ
        </button>
      </div>
    </article>
  );
}
