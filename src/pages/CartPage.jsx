import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function toVnd(value) {
  return Number(value || 0).toLocaleString("vi-VN") + " ₫";
}

export default function CartPage() {
  const { items, subtotal, subtotalText, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <section className="section cart-page">
      <div className="container cart-container">
        <h1>Giỏ hàng</h1>

        {!items.length ? (
          <article className="cart-empty">
            <p>Giỏ hàng của bạn đang trống.</p>
            <Link to="/" className="cart-back-home">
              Tiếp tục mua sắm
            </Link>
          </article>
        ) : (
          <div className="cart-layout">
            <section className="cart-items">
              {items.map((item) => (
                <article key={item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-main">
                    <p className="cart-item-category">{item.category}</p>
                    <h2>{item.name}</h2>
                    <p className="cart-item-price">{item.priceText}</p>
                  </div>

                  <div className="cart-item-actions">
                    <label>
                      Số lượng
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.id, event.target.value)}
                      />
                    </label>
                    <p className="cart-item-total">{toVnd(item.price * item.quantity)}</p>
                    <button type="button" onClick={() => removeFromCart(item.id)}>
                      Xóa
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="cart-summary">
              <h3>Tóm tắt đơn hàng</h3>
              <p>
                <span>Tạm tính</span>
                <strong>{subtotalText}</strong>
              </p>
              <p>
                <span>Phí vận chuyển</span>
                <strong>Liên hệ</strong>
              </p>
              <p className="grand-total">
                <span>Tổng cộng</span>
                <strong>{toVnd(subtotal)}</strong>
              </p>

              <button type="button" className="checkout-btn">
                Tiến hành đặt hàng
              </button>
              <button type="button" className="clear-cart-btn" onClick={clearCart}>
                Xóa toàn bộ giỏ hàng
              </button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
