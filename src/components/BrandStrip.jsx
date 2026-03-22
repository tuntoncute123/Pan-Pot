const brands = ["Electrolux", "Panasonic", "Samsung", "Hitachi", "Aqua", "Faber"];

export default function BrandStrip() {
  return (
    <section className="section">
      <div className="container brands reveal">
        <h2>THUONG HIEU HANG DAU</h2>
        <div className="brand-row">
          {brands.map((brand) => (
            <span key={brand}>{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
