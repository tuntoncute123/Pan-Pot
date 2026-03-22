import { useEffect, useState } from "react";
import { createAdminProduct, getAdminDashboardData } from "../lib/productsApi";

const emptyDashboard = {
  source: "fallback",
  message: "Đang khởi tạo dữ liệu dashboard...",
  metrics: [],
  recentProducts: [],
  categoryPerformance: [],
  activities: [],
};

const initialProductForm = {
  name: "",
  slug: "",
  brand: "",
  category: "",
  subCategory: "",
  price: "",
  salePrice: "",
  image: "",
  images: "",
  description: "",
  details: "",
  isNew: false,
  isSale: false,
  isTrending: false,
  inStock: true,
  stock: 0,
  badges: "",
  material: "",
  capacity: "",
  color: "",
  weight: "",
  origin: "",
  warranty: "",
  suitableFor: "",
  rating: 0,
  reviewCount: 0,
  sold: 0,
};

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [productForm, setProductForm] = useState(initialProductForm);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(dashboard.recentProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = dashboard.recentProducts.slice(startIndex, endIndex);

  async function loadDashboard() {
    const data = await getAdminDashboardData();
    setDashboard(data);
    setCurrentPage(1);
    setIsLoading(false);
  }

  function openAddProductModal() {
    setIsModalOpen(true);
    setSubmitError("");
    setSubmitSuccess("");
  }

  function closeAddProductModal() {
    if (isSubmitting) {
      return;
    }

    setIsModalOpen(false);
    setSubmitError("");
    setSubmitSuccess("");
  }

  function handleFormChange(event) {
    const { name, type, value, checked } = event.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleCreateProduct(event) {
    event.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");
    setIsSubmitting(true);

    const result = await createAdminProduct(productForm);

    if (!result.ok) {
      setSubmitError(result.error || "Không thể thêm sản phẩm.");
      setIsSubmitting(false);
      return;
    }

    setSubmitSuccess("Đã thêm sản phẩm thành công.");
    setProductForm(initialProductForm);
    await loadDashboard();
    setIsSubmitting(false);
  }

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardOnce() {
      const data = await getAdminDashboardData();

      if (!isMounted) {
        return;
      }

      setDashboard(data);
      setIsLoading(false);
    }

    loadDashboardOnce();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section admin-dashboard-page">
      <div className="container admin-dashboard">
        <header className="admin-hero reveal">
          <div>
            <p className="admin-eyebrow">KHU VỰC QUẢN TRỊ</p>
            <h1>Dashboard Vận Hành Của Cửa Hàng</h1>
            <p className="admin-subtitle">
              Theo dõi tình hình sản phẩm, hiệu suất danh mục và các cập nhật mới nhất trong một màn hình.
            </p>
          </div>
          <div className="admin-actions">
            <button type="button" onClick={openAddProductModal}>
              Thêm sản phẩm
            </button>
            <button type="button" className="ghost">
              Tải báo cáo
            </button>
          </div>
        </header>

        {isLoading ? (
          <div className="admin-loading reveal delay-1">Đang tải dữ liệu dashboard...</div>
        ) : (
          <>
            <section className="admin-metrics-grid reveal delay-1">
              {dashboard.metrics.map((metric) => (
                <article key={metric.label} className={`admin-metric-card ${metric.tone}`}>
                  <p>{metric.label}</p>
                  <h3>{metric.value}</h3>
                  <span>{metric.hint}</span>
                </article>
              ))}
            </section>

            <div className="admin-content-grid reveal delay-2">
              <section className="admin-panel recent-products-panel">
                <div className="panel-head">
                  <h2>Sản phẩm cập nhật gần đây</h2>
                  <span>{dashboard.recentProducts.length} bản ghi</span>
                </div>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Tên sản phẩm</th>
                        <th>Danh mục</th>
                        <th>Giá bán</th>
                        <th>Giảm</th>
                        <th>Cập nhật</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedProducts.map((product) => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>{product.category}</td>
                          <td>{product.price}</td>
                          <td>{product.sale}</td>
                          <td>{product.updatedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {totalPages > 1 && (
                  <div className="pagination-controls">
                    <button
                      type="button"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                    >
                      ← Trang trước
                    </button>
                    
                    <div className="pagination-pages">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="pagination-btn"
                    >
                      Trang sau →
                    </button>
                  </div>
                )}
              </section>

              <aside className="admin-sidebar">
                <section className="admin-panel performance-panel">
                  <div className="panel-head">
                    <h2>Hiệu suất danh mục</h2>
                  </div>
                  <div className="category-performance-list">
                    {dashboard.categoryPerformance.map((item) => (
                      <article key={item.category}>
                        <div>
                          <h4>{item.category}</h4>
                          <p>
                            {item.count} sản phẩm · Giá TB {item.avgPrice}
                          </p>
                        </div>
                        <div className="performance-track" role="img" aria-label={`${item.category} đạt ${item.progress}%`}>
                          <span style={{ width: `${item.progress}%` }} />
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="admin-panel activity-panel">
                  <div className="panel-head">
                    <h2>Hoạt động hệ thống</h2>
                  </div>
                  <ul className="activity-list">
                    {dashboard.activities.map((item) => (
                      <li key={item.id}>
                        <p>
                          <strong>{item.title}</strong>
                          <span>{item.time}</span>
                        </p>
                        <small>{item.detail}</small>
                      </li>
                    ))}
                  </ul>
                </section>
              </aside>
            </div>
          </>
        )}
      </div>

      {isModalOpen ? (
        <div className="admin-modal-overlay" role="presentation" onClick={closeAddProductModal}>
          <section
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Thêm sản phẩm"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="admin-modal-head">
              <h2>Thêm sản phẩm mới</h2>
              <button type="button" className="admin-modal-close" onClick={closeAddProductModal}>
                Đóng
              </button>
            </header>

            <form className="admin-product-form" onSubmit={handleCreateProduct}>
              <div className="admin-product-grid">
                <label>
                  Tên sản phẩm *
                  <input name="name" value={productForm.name} onChange={handleFormChange} required />
                </label>

                <label>
                  Slug
                  <input name="slug" value={productForm.slug} onChange={handleFormChange} placeholder="tu-dong-tu-ten-neu-bo-trong" />
                </label>

                <label>
                  Thương hiệu *
                  <input name="brand" value={productForm.brand} onChange={handleFormChange} required />
                </label>

                <label>
                  Danh mục *
                  <input name="category" value={productForm.category} onChange={handleFormChange} required />
                </label>

                <label>
                  Danh mục con
                  <input name="subCategory" value={productForm.subCategory} onChange={handleFormChange} />
                </label>

                <label>
                  Giá *
                  <input name="price" type="number" min="0" value={productForm.price} onChange={handleFormChange} required />
                </label>

                <label>
                  Giá giảm
                  <input name="salePrice" type="number" min="0" value={productForm.salePrice} onChange={handleFormChange} />
                </label>

                <label>
                  Ảnh đại diện (URL)
                  <input name="image" value={productForm.image} onChange={handleFormChange} placeholder="https://..." />
                </label>

                <label className="span-2">
                  Danh sách ảnh (cách nhau bằng dấu phẩy)
                  <textarea name="images" rows="2" value={productForm.images} onChange={handleFormChange} placeholder="https://img1.jpg, https://img2.jpg" />
                </label>

                <label className="span-2">
                  Mô tả
                  <textarea name="description" rows="3" value={productForm.description} onChange={handleFormChange} />
                </label>

                <label className="span-2">
                  Chi tiết
                  <textarea name="details" rows="3" value={productForm.details} onChange={handleFormChange} />
                </label>

                <label>
                  Chất liệu
                  <input name="material" value={productForm.material} onChange={handleFormChange} />
                </label>

                <label>
                  Dung tích
                  <input name="capacity" value={productForm.capacity} onChange={handleFormChange} />
                </label>

                <label>
                  Màu sắc
                  <input name="color" value={productForm.color} onChange={handleFormChange} />
                </label>

                <label>
                  Khối lượng
                  <input name="weight" value={productForm.weight} onChange={handleFormChange} />
                </label>

                <label>
                  Xuất xứ
                  <input name="origin" value={productForm.origin} onChange={handleFormChange} />
                </label>

                <label>
                  Bảo hành
                  <input name="warranty" value={productForm.warranty} onChange={handleFormChange} />
                </label>

                <label>
                  Phù hợp cho
                  <input name="suitableFor" value={productForm.suitableFor} onChange={handleFormChange} />
                </label>

                <label>
                  Tồn kho
                  <input name="stock" type="number" min="0" value={productForm.stock} onChange={handleFormChange} />
                </label>

                <label>
                  Đánh giá (0-5)
                  <input name="rating" type="number" min="0" max="5" step="0.1" value={productForm.rating} onChange={handleFormChange} />
                </label>

                <label>
                  Số lượt đánh giá
                  <input name="reviewCount" type="number" min="0" value={productForm.reviewCount} onChange={handleFormChange} />
                </label>

                <label>
                  Đã bán
                  <input name="sold" type="number" min="0" value={productForm.sold} onChange={handleFormChange} />
                </label>

                <label className="span-2">
                  Badge (cách nhau bằng dấu phẩy)
                  <input name="badges" value={productForm.badges} onChange={handleFormChange} placeholder="hot, new, sale" />
                </label>
              </div>

              <div className="admin-product-checks">
                <label>
                  <input name="inStock" type="checkbox" checked={productForm.inStock} onChange={handleFormChange} /> Còn hàng
                </label>
                <label>
                  <input name="isNew" type="checkbox" checked={productForm.isNew} onChange={handleFormChange} /> Mới
                </label>
                <label>
                  <input name="isSale" type="checkbox" checked={productForm.isSale} onChange={handleFormChange} /> Đang giảm giá
                </label>
                <label>
                  <input name="isTrending" type="checkbox" checked={productForm.isTrending} onChange={handleFormChange} /> Xu hướng
                </label>
              </div>

              {submitError ? <p className="admin-form-error">{submitError}</p> : null}
              {submitSuccess ? <p className="admin-form-success">{submitSuccess}</p> : null}

              <div className="admin-form-actions">
                <button type="button" className="ghost" onClick={closeAddProductModal}>
                  Hủy
                </button>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Đang lưu..." : "Lưu sản phẩm"}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </section>
  );
}
