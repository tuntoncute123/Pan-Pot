const services = [
  {
    title: "Mien phi van chuyen",
    text: "Ho tro giao nhanh noi thanh va tinh thanh lan can cho don tu 2.000.000 VND.",
  },
  {
    title: "Doi tra linh hoat",
    text: "Ap dung trong 7 ngay neu loi tu nha san xuat, minh bach va ro rang.",
  },
  {
    title: "Lap dat tan noi",
    text: "Ky thuat vien kiem tra va huong dan su dung khi giao san pham.",
  },
  {
    title: "Tu van 24/7",
    text: "Hotline luon san sang ho tro chon mau phu hop dien tich va ngan sach.",
  },
];

export default function ServiceHighlights() {
  return (
    <section className="section">
      <div className="container service-grid reveal">
        {services.map((service) => (
          <article key={service.title}>
            <h4>{service.title}</h4>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
