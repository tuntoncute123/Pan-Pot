import { useEffect, useState } from "react";
import { getAdminDashboardData } from "../lib/productsApi";

const emptyDashboard = {
  metrics: [],
  recentProducts: [],
  categoryPerformance: [],
  activities: [],
};

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      const data = await getAdminDashboardData();

      if (!isMounted) {
        return;
      }

      setDashboard(data);
      setIsLoading(false);
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section admin-dashboard-page">
      <div className="container admin-dashboard">
        <header className="admin-hero reveal">
          <div>
            <p className="admin-eyebrow">KHU VUC QUAN TRI</p>
            <h1>Dashboard Van Hanh Cua Cua Hang</h1>
            <p className="admin-subtitle">
              Theo doi tinh hinh san pham, hieu suat danh muc va cac cap nhat moi nhat trong mot man hinh.
            </p>
          </div>
          <div className="admin-actions">
            <button type="button">Them san pham</button>
            <button type="button" className="ghost">
              Tai bao cao
            </button>
          </div>
        </header>

        {isLoading ? (
          <div className="admin-loading reveal delay-1">Dang tai du lieu dashboard...</div>
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
                  <h2>San pham cap nhat gan day</h2>
                  <span>{dashboard.recentProducts.length} ban ghi</span>
                </div>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Ten san pham</th>
                        <th>Danh muc</th>
                        <th>Gia ban</th>
                        <th>Giam</th>
                        <th>Cap nhat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard.recentProducts.map((product) => (
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
              </section>

              <aside className="admin-sidebar">
                <section className="admin-panel performance-panel">
                  <div className="panel-head">
                    <h2>Hieu suat danh muc</h2>
                  </div>
                  <div className="category-performance-list">
                    {dashboard.categoryPerformance.map((item) => (
                      <article key={item.category}>
                        <div>
                          <h4>{item.category}</h4>
                          <p>
                            {item.count} san pham · Gia TB {item.avgPrice}
                          </p>
                        </div>
                        <div className="performance-track" role="img" aria-label={`${item.category} dat ${item.progress}%`}>
                          <span style={{ width: `${item.progress}%` }} />
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="admin-panel activity-panel">
                  <div className="panel-head">
                    <h2>Hoat dong he thong</h2>
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
    </section>
  );
}
