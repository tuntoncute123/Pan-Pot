const DEFAULT_SITE_NAME = "Nội thất bếp Pan&Pot";
const DEFAULT_DESCRIPTION =
  "Pan&Pot cung cấp tủ bếp, bàn ăn và thiết bị nhà bếp hiện đại với thiết kế tinh tế, giá hợp lý và dịch vụ tận tâm.";
const DEFAULT_IMAGE_PATH = "/logo-pan-pot.png";

const routeSeoMap = {
  "/": {
    title: "Nội thất bếp Pan&Pot | Tủ bếp và bàn ăn hiện đại",
    description:
      "Khám phá bộ sưu tập tủ bếp, bàn ăn và thiết bị nhà bếp hiện đại tại Pan&Pot với mẫu mã đẹp và giá tốt.",
    keywords: "noi that bep, tu bep, ban an, thiet bi nha bep, pan pot",
    type: "WebPage",
    priority: "1.0",
  },
  "/tu-bep": {
    title: "Tủ Bếp | Nội thất bếp Pan&Pot",
    description:
      "Danh mục tủ bếp hiện đại với nhiều kiểu dáng: chữ I, chữ L, module thông minh và vật liệu bền đẹp.",
    keywords: "tu bep, tu bep go, tu bep acrylic, noi that bep",
    type: "CollectionPage",
    priority: "0.9",
  },
  "/ban-an": {
    title: "Bàn Ăn | Nội thất bếp Pan&Pot",
    description:
      "Xem các mẫu bàn ăn gỗ cao cấp, bộ bàn ăn 4-6 ghế phù hợp cho căn hộ và nhà phố.",
    keywords: "ban an, bo ban an, noi that phong an, ban ghe an",
    type: "CollectionPage",
    priority: "0.9",
  },
  "/ghe-an": {
    title: "Ghế Ăn | Nội thất bếp Pan&Pot",
    description: "Danh mục ghế ăn tiện nghi, tối ưu không gian bếp và phòng ăn hiện đại.",
    keywords: "ghe an, ghe phong an, noi that bep",
    type: "CollectionPage",
    priority: "0.7",
  },
  "/tu-lanh": {
    title: "Tủ Lạnh | Nội thất bếp Pan&Pot",
    description: "Tham khảo các mẫu tủ lạnh phù hợp không gian bếp gia đình và căn hộ.",
    keywords: "tu lanh, thiet bi nha bep, noi that bep",
    type: "CollectionPage",
    priority: "0.7",
  },
  "/lo-vi-song": {
    title: "Lò Vi Sóng | Nội thất bếp Pan&Pot",
    description: "Các mẫu lò vi sóng tiện lợi cho gian bếp hiện đại.",
    keywords: "lo vi song, thiet bi nha bep",
    type: "CollectionPage",
    priority: "0.7",
  },
  "/cac-loai-bep": {
    title: "Các Loại Bếp | Nội thất bếp Pan&Pot",
    description: "Danh mục các loại bếp phù hợp từng nhu cầu nấu nướng và diện tích nhà bếp.",
    keywords: "bep ga, bep tu, bep hong ngoai, cac loai bep",
    type: "CollectionPage",
    priority: "0.7",
  },
  "/may-hut-mui": {
    title: "Máy Hút Mùi | Nội thất bếp Pan&Pot",
    description: "Máy hút mùi hiệu quả giúp không gian bếp luôn thông thoáng và sạch mùi.",
    keywords: "may hut mui, thiet bi bep",
    type: "CollectionPage",
    priority: "0.7",
  },
  "/den-nha-bep": {
    title: "Đèn Nhà Bếp | Nội thất bếp Pan&Pot",
    description: "Giải pháp đèn nhà bếp tối ưu ánh sáng và tăng thẩm mỹ không gian.",
    keywords: "den nha bep, den trang tri bep",
    type: "CollectionPage",
    priority: "0.7",
  },
  "/cac-may-khac": {
    title: "Các Máy Khác | Nội thất bếp Pan&Pot",
    description: "Tổng hợp các thiết bị nhà bếp bổ trợ cho trải nghiệm nấu nướng tiện lợi.",
    keywords: "thiet bi bep, may nha bep",
    type: "CollectionPage",
    priority: "0.7",
  },
  "/phu-kien-nha-bep": {
    title: "Phụ Kiện Nhà Bếp | Nội thất bếp Pan&Pot",
    description: "Danh mục phụ kiện nhà bếp thông minh giúp tăng công năng sử dụng.",
    keywords: "phu kien nha bep, phu kien tu bep",
    type: "CollectionPage",
    priority: "0.7",
  },
  "/chau-rua-voi-rua": {
    title: "Chậu Rửa - Vòi Rửa | Nội thất bếp Pan&Pot",
    description: "Khám phá chậu rửa và vòi rửa bền đẹp cho khu vực bếp hiện đại.",
    keywords: "chau rua, voi rua, thiet bi bep",
    type: "CollectionPage",
    priority: "0.7",
  },
  "/admin": {
    title: "Quản trị | Pan&Pot",
    description: "Trang quản trị nội bộ Pan&Pot.",
    keywords: "admin, quan tri",
    type: "WebPage",
    noindex: true,
  },
};

const publicRoutes = Object.entries(routeSeoMap)
  .filter(([, value]) => !value.noindex)
  .map(([path, value]) => ({
    path,
    changefreq: "weekly",
    priority: value.priority || "0.7",
  }));

function normalizeBaseUrl(raw) {
  return String(raw || "").trim().replace(/\/$/, "");
}

function slugToTitle(pathname) {
  return pathname
    .replace(/^\//, "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getPageType(pathname) {
  if (pathname === "/") {
    return "WebPage";
  }

  return "CollectionPage";
}

function getSeoForPath(pathname) {
  const mapped = routeSeoMap[pathname];
  if (mapped) {
    return mapped;
  }

  const slugTitle = slugToTitle(pathname);

  return {
    title: `${slugTitle} | ${DEFAULT_SITE_NAME}`,
    description: `Danh mục ${slugTitle} tại ${DEFAULT_SITE_NAME}. Cập nhật sản phẩm và thông tin mới nhất cho không gian bếp hiện đại.`,
    keywords: `noi that bep, ${slugTitle.toLowerCase()}, pan pot`,
    type: getPageType(pathname),
  };
}

function getBreadcrumbItems(pathname) {
  if (!pathname || pathname === "/") {
    return [{ path: "/", name: "Trang chủ" }];
  }

  const segments = pathname.replace(/^\//, "").split("/").filter(Boolean);
  const breadcrumb = [{ path: "/", name: "Trang chủ" }];

  let currentPath = "";
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const mapped = routeSeoMap[currentPath];
    const name = mapped?.title?.split("|")[0]?.trim() || slugToTitle(currentPath);
    breadcrumb.push({ path: currentPath, name });
  });

  return breadcrumb;
}

export {
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE_PATH,
  DEFAULT_SITE_NAME,
  getBreadcrumbItems,
  getSeoForPath,
  normalizeBaseUrl,
  publicRoutes,
  routeSeoMap,
};
