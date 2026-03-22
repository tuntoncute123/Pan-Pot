import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedTabs from "./components/FeaturedTabs";
import CatalogSection from "./components/CatalogSection";
import NewsSection from "./components/NewsSection";
import Footer from "./components/Footer";
import SeoManager from "./components/SeoManager";
import TuBepPage from "./pages/TuBepPage";
import BanAnPage from "./pages/BanAnPage";
import CategoryEmptyPage from "./pages/CategoryEmptyPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import LoginPage from "./pages/LoginPage";

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedTabs />
      <CatalogSection />
      <NewsSection />
    </>
  );
}

export default function App() {
  return (
    <>
      <SeoManager />
      <div className="site-bg" />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/tu-bep" element={<TuBepPage />} />
          <Route path="/ban-an" element={<BanAnPage />} />
          <Route
            path="/ghe-an"
            element={<CategoryEmptyPage title="Ghế Ăn" activePath="/ghe-an" categorySlug="ghe-an" />}
          />
          <Route
            path="/tu-lanh"
            element={<CategoryEmptyPage title="Tủ Lạnh" activePath="/tu-lanh" categorySlug="tu-lanh" />}
          />
          <Route
            path="/lo-vi-song"
            element={<CategoryEmptyPage title="Lò Vi Sóng" activePath="/lo-vi-song" categorySlug="lo-vi-song" />}
          />
          <Route
            path="/cac-loai-bep"
            element={
              <CategoryEmptyPage title="Các Loại Bếp" activePath="/cac-loai-bep" categorySlug="cac-loai-bep" />
            }
          />
          <Route
            path="/may-hut-mui"
            element={
              <CategoryEmptyPage title="Máy Hút Mùi" activePath="/may-hut-mui" categorySlug="may-hut-mui" />
            }
          />
          <Route
            path="/den-nha-bep"
            element={
              <CategoryEmptyPage title="Đèn Nhà Bếp" activePath="/den-nha-bep" categorySlug="den-nha-bep" />
            }
          />
          <Route
            path="/cac-may-khac"
            element={
              <CategoryEmptyPage title="Các Máy Khác" activePath="/cac-may-khac" categorySlug="cac-may-khac" />
            }
          />
          <Route
            path="/phu-kien-nha-bep"
            element={
              <CategoryEmptyPage
                title="Phụ Kiện Nhà Bếp"
                activePath="/phu-kien-nha-bep"
                categorySlug="phu-kien-nha-bep"
              />
            }
          />
          <Route
            path="/chau-rua-voi-rua"
            element={
              <CategoryEmptyPage
                title="Chậu Rửa-Vòi Rửa"
                activePath="/chau-rua-voi-rua"
                categorySlug="chau-rua-voi-rua"
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
