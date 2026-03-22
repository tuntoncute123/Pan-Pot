import { Link } from "react-router-dom";

const footerCategoryLinks = [
  { to: "/tu-bep", label: "Tủ bếp" },
  { to: "/ban-an", label: "Bàn ăn" },
  { to: "/may-hut-mui", label: "Máy hút mùi" },
  { to: "/phu-kien-nha-bep", label: "Phụ kiện nhà bếp" },
  { to: "/chau-rua-voi-rua", label: "Chậu rửa - vòi rửa" },
];

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container footer-grid">
        <div>
          <h5>CHĂM SÓC KHÁCH HÀNG</h5>
          <ul>
            <li>Miễn phí vận chuyển</li>
            <li>Điều khoản giao dịch</li>
            <li>Hỗ trợ đặt hàng</li>
            <li>Phương thức thanh toán</li>
            <li>Chính sách bảo hành</li>
          </ul>
        </div>
        <div>
          <h5>TỔNG ĐÀI TƯ VẤN</h5>
          <p>(+84) 0313-728-397</p>
          <p>Từ 7h30 - 22h (T2 - T6)</p>
        </div>
        <div>
          <h5>DANH MỤC NỔI BẬT</h5>
          <ul>
            {footerCategoryLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5>KẾT NỐI VỚI CHÚNG TÔI</h5>
          <p>Siêu thị Mona Shop</p>
          <p>1073/23 CMT8, P.7, Q.Tan Binh, TP.HCM</p>
          <p>Email: info@themona.global</p>
        </div>
      </div>
      <p className="copyright">© 2026 Kitchen React Demo. Giao diện mô phỏng từ mẫu tham khảo.</p>
    </footer>
  );
}
