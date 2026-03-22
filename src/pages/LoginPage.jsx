import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const VALID_USERNAME = "phuonganh";
const VALID_PASSWORD = "phuonganh123";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (username.trim() === VALID_USERNAME && password === VALID_PASSWORD) {
      setErrorMessage("");
      localStorage.setItem("admin_auth", JSON.stringify({ username, timestamp: Date.now() }));
      window.dispatchEvent(new Event("admin-auth-changed"));
      navigate("/admin");
      return;
    }

    setErrorMessage("Tên đăng nhập hoặc mật khẩu không đúng.");
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  }

  return (
    <section className="section login-page">
      <div className="container login-wrap">
        <article className="login-card reveal">
          <header>
            <p className="login-eyebrow">PAN & POT</p>
            <h1>Đăng nhập</h1>
            <p>Đăng nhập để truy cập khu vực quản trị cửa hàng và theo dõi dữ liệu vận hành.</p>
          </header>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Nhập tên đăng nhập"
              autoComplete="username"
              required
            />

            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />

            {errorMessage ? (
              <p className="login-error" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <button type="submit">Đăng nhập</button>
          </form>

          <p className="login-note">
            Bạn chưa có tài khoản? <Link to="/">Về trang chủ</Link>
          </p>
        </article>
      </div>
    </section>
  );
}
