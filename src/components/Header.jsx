import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const mainMenuLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/#featured", label: "Sản phẩm nổi bật" },
  { href: "/#catalog", label: "Danh mục" },
  { href: "/#news", label: "Tin tức" },
  { href: "/#footer", label: "Liên hệ" },
];

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function syncAuthState() {
      const authData = localStorage.getItem("admin_auth");
      setIsLoggedIn(Boolean(authData));
    }

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("admin-auth-changed", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("admin-auth-changed", syncAuthState);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("admin_auth");
    window.dispatchEvent(new Event("admin-auth-changed"));
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <header id="header" className="site-header has-sticky sticky-jump">
      <div className="header-wrapper">
        <div id="top-bar" className="header-top hide-for-medium">
          <div className="container header-top-row">
            <div className="header-top-col">
              <a href="#">Hệ thống siêu thị</a>
            </div>

            <div className="header-top-col center">
              <p>
                Hotline:
                <a href="tel:+840313728397"> (+84) 0313-728-397</a>
              </p>
            </div>

            <div className="header-top-col right">
              {isLoggedIn ? (
                <button type="button" onClick={handleLogout} style={{ border: 0, background: "none", color: "#fff", cursor: "pointer", fontWeight: 700 }}>
                  Đăng xuất
                </button>
              ) : (
                <Link to="/dang-nhap">Đăng nhập</Link>
              )}
            </div>
          </div>
        </div>

        <div id="masthead" className="header-main">
          <div className="container masthead-row" role="navigation" aria-label="Điều hướng chính">
            <div className="show-for-medium mobile-left">
              <button
                className="mobile-icon-button"
                type="button"
                aria-label="Mở menu"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                ☰
              </button>
            </div>

            <Link className="logo-block" to="/" title="Nội thất Bếp">
              <img
                width="280"
                height="80"
                src="/logo-pan-pot.png"
                alt="PAN & POT"
              />
            </Link>

            <div className="hide-for-medium masthead-left">
              <form className="header-search" onSubmit={(event) => event.preventDefault()}>
                <input type="search" placeholder="Bạn muốn tìm gì nào ...?" />
                <button type="submit" aria-label="Tìm kiếm">
                  🔍
                </button>
              </form>

              <a href="#" className="header-cart-link" title="Giỏ hàng">
                <span className="header-cart-icon" aria-hidden="true">
                  🛒
                </span>
              </a>
            </div>

            <div className="hide-for-medium masthead-right">
              <div className="policy-badge">
                <span className="policy-icon red">🛡</span>
                <p>
                  100% bảo vệ
                  <br />
                  người mua hàng
                </p>
              </div>

              <div className="policy-badge">
                <span className="policy-icon yellow">💰</span>
                <p>
                  Thanh toán
                  <br />
                  khi nhận hàng
                </p>
              </div>
            </div>

            <div className="show-for-medium mobile-right">
              <a href="#" className="mobile-icon-button" aria-label="Giỏ hàng" title="Giỏ hàng">
                🛒
              </a>
            </div>
          </div>

          <div className={`mobile-panel ${isOpen ? "open" : ""}`}>
            <div className="container">
              <ul>
                {mainMenuLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} onClick={() => setIsOpen(false)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
