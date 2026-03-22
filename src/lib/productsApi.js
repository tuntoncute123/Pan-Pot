import { hasSupabaseConfig, supabase } from "./supabaseClient";

function toVnd(value) {
  return Number(value || 0).toLocaleString("vi-VN") + " ₫";
}

function mapProductRow(row) {
  const basePrice = toNumber(row.price);
  const salePrice = row.salePrice ?? row.sale_price;
  const salePercentRaw = row.sale_percent;
  let salePercent = toNumber(salePercentRaw);

  if (!salePercent && salePrice != null && basePrice > toNumber(salePrice)) {
    salePercent = Math.round(((basePrice - toNumber(salePrice)) / basePrice) * 100);
  }

  return {
    id: row.id,
    slug: row.slug || null,
    category: row.category_label || row.category || "Khác",
    name: row.name,
    oldPrice: row.old_price ? toVnd(row.old_price) : "",
    price: toVnd(basePrice),
    sale: salePercent ? `-${salePercent}%` : "",
    image: row.image,
  };
}

function mapWidgetRow(row) {
  return {
    id: row.id,
    title: row.name,
    oldPrice: row.old_price ? toVnd(row.old_price) : "",
    price: toVnd(row.price),
    image: row.image,
  };
}

const fallbackAdminRows = [
  {
    id: "fb-1",
    category_label: "TỦ BẾP",
    name: "Tủ bếp gỗ sồi hiện đại cánh kính",
    price: 17900000,
    sale_percent: 4,
    is_active: true,
    updated_at: "2026-03-22T09:00:00.000Z",
  },
  {
    id: "fb-2",
    category_label: "BÀN ĂN",
    name: "Bộ bàn ăn 6 ghế xuất khẩu Nhật",
    price: 10980000,
    sale_percent: 1,
    is_active: true,
    updated_at: "2026-03-22T08:25:00.000Z",
  },
  {
    id: "fb-3",
    category_label: "MÁY HÚT MÙI",
    name: "Máy hút mùi kính cong KAFF KF-GB 902",
    price: 5742000,
    sale_percent: 2,
    is_active: true,
    updated_at: "2026-03-21T15:45:00.000Z",
  },
  {
    id: "fb-4",
    category_label: "CÁC LOẠI BẾP",
    name: "Bếp gas âm kính Apex",
    price: 6575000,
    sale_percent: 6,
    is_active: true,
    updated_at: "2026-03-21T10:30:00.000Z",
  },
  {
    id: "fb-5",
    category_label: "GHẾ ĂN",
    name: "Ghế bàn ăn Gislevi",
    price: 2352000,
    sale_percent: 8,
    is_active: true,
    updated_at: "2026-03-20T13:15:00.000Z",
  },
  {
    id: "fb-6",
    category_label: "TỦ LẠNH",
    name: "Tủ lạnh inverter 2 cánh 320L",
    price: 12490000,
    sale_percent: 5,
    is_active: true,
    updated_at: "2026-03-20T09:50:00.000Z",
  },
];

function formatDateTime(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Vừa cập nhật";
  }

  return date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });
}

function toNumber(value) {
  const num = Number(value ?? 0);
  return Number.isFinite(num) ? num : 0;
}

function toNullableNumber(value) {
  if (value === "" || value == null) {
    return null;
  }

  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function slugify(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function splitByComma(text) {
  return String(text || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toNullableText(value) {
  const text = String(value ?? "").trim();
  return text || null;
}

function normalizeDashboardRow(row) {
  const price = toNumber(row.price);
  const salePercentRaw = row.sale_percent;
  const salePriceRaw = row.salePrice ?? row.sale_price;
  const salePrice = salePriceRaw == null ? null : toNumber(salePriceRaw);

  let salePercent = toNumber(salePercentRaw);
  if (!salePercent && salePrice != null && salePrice > 0 && price > salePrice) {
    salePercent = Math.round(((price - salePrice) / price) * 100);
  }

  return {
    id: row.id,
    category_label: row.category_label || row.category || "Khác",
    name: row.name,
    price,
    sale_percent: salePercent,
    is_active: row.is_active ?? row.inStock ?? true,
    updated_at: row.updated_at,
  };
}

function buildAdminDashboard(rows, isFallback = false) {
  const activeRows = rows.filter((row) => row.is_active !== false);
  const totalProducts = activeRows.length;
  const totalCategories = new Set(activeRows.map((row) => row.category_label || "Khác")).size;
  const discountRows = activeRows.filter((row) => Number(row.sale_percent) > 0);
  const avgDiscount = discountRows.length
    ? Math.round(discountRows.reduce((sum, row) => sum + Number(row.sale_percent || 0), 0) / discountRows.length)
    : 0;
  const featuredProducts = activeRows.filter((row) => Number(row.sale_percent || 0) >= 5).length;

  const categoryMap = new Map();
  for (const row of activeRows) {
    const category = row.category_label || "Khác";
    const current = categoryMap.get(category) || { count: 0, totalPrice: 0 };
    categoryMap.set(category, {
      count: current.count + 1,
      totalPrice: current.totalPrice + Number(row.price || 0),
    });
  }

  const maxCategoryCount = Math.max(...Array.from(categoryMap.values()).map((item) => item.count), 1);

  const categoryPerformance = Array.from(categoryMap.entries())
    .map(([category, stats]) => ({
      category,
      count: stats.count,
      avgPrice: toVnd(Math.round(stats.totalPrice / Math.max(stats.count, 1))),
      progress: Math.max(12, Math.round((stats.count / maxCategoryCount) * 100)),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const recentProducts = [...activeRows]
    .sort((a, b) => Number(b.id || 0) - Number(a.id || 0))
    .map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category_label || "Khác",
      price: toVnd(row.price),
      sale: row.sale_percent ? `-${row.sale_percent}%` : "0%",
      updatedAt: formatDateTime(row.updated_at),
    }));

  const activities = recentProducts.slice(0, 4).map((item, index) => ({
    id: `${item.id}-activity`,
    title: isFallback && index === 0 ? "Đang dùng dữ liệu mẫu" : `Sản phẩm ${item.name}`,
    time: item.updatedAt,
    detail: `${item.category} · ${item.price}`,
  }));

  return {
    source: isFallback ? "fallback" : "supabase",
    message: isFallback
      ? "Dashboard đang hiển thị dữ liệu mẫu. Kiểm tra cấu hình Supabase hoặc dữ liệu bảng products."
      : "Dashboard đang hiển thị dữ liệu từ Supabase.",
    metrics: [
      {
        label: "Tổng sản phẩm",
        value: totalProducts.toLocaleString("vi-VN"),
        hint: "Sản phẩm đang hiển thị",
        tone: "tone-blue",
      },
      {
        label: "Danh mục hoạt động",
        value: totalCategories.toLocaleString("vi-VN"),
        hint: "Danh mục có ít nhất 1 sản phẩm",
        tone: "tone-orange",
      },
      {
        label: "Giảm giá trung bình",
        value: `${avgDiscount}%`,
        hint: "Theo các sản phẩm có khuyến mãi",
        tone: "tone-green",
      },
      {
        label: "Sản phẩm nổi bật",
        value: featuredProducts.toLocaleString("vi-VN"),
        hint: "Sản phẩm giảm từ 5% trở lên",
        tone: "tone-red",
      },
    ],
    recentProducts,
    categoryPerformance,
    activities,
  };
}

export async function getCategoryProducts(categorySlug) {
  if (!hasSupabaseConfig || !supabase) {
    return [];
  }

  const legacyResult = await supabase
    .from("products")
    .select("id, category_label, name, old_price, price, sale_percent, image, sort_order")
    .eq("category_slug", categorySlug)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("id", { ascending: false });

  if (!legacyResult.error && (legacyResult.data || []).length) {
    return (legacyResult.data || []).map(mapProductRow);
  }

  const modernResult = await supabase
    .from("products")
    .select('id, slug, category, name, price, "salePrice", image, "inStock"')
    .eq("category", categorySlug)
    .eq("inStock", true)
    .order("id", { ascending: false });

  if (modernResult.error) {
    console.error("Cannot load products from Supabase", {
      legacyError: legacyResult.error,
      modernError: modernResult.error,
    });
    return [];
  }

  return (modernResult.data || []).map(mapProductRow);
}

export async function getSidebarProducts(limit = 5) {
  if (!hasSupabaseConfig || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, name, old_price, price, image, sort_order")
    .eq("is_sidebar", true)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Cannot load sidebar products from Supabase", error);
    return [];
  }

  return (data || []).map(mapWidgetRow);
}

export async function getAdminDashboardData() {
  if (!hasSupabaseConfig || !supabase) {
    return buildAdminDashboard(fallbackAdminRows, true);
  }

  const legacyResult = await supabase
    .from("products")
    .select("id, category_label, name, price, sale_percent, is_active, updated_at")
    .eq("is_active", true)
    .order("updated_at", { ascending: false })
    .limit(120);

  if (!legacyResult.error) {
    const normalizedRows = (legacyResult.data || []).map(normalizeDashboardRow);

    if (normalizedRows.length) {
      return buildAdminDashboard(normalizedRows);
    }
  }

  const modernResult = await supabase
    .from("products")
    .select('id, category, name, price, "salePrice", "inStock", updated_at')
    .eq("inStock", true)
    .order("updated_at", { ascending: false })
    .limit(120);

  if (modernResult.error) {
    console.error("Cannot load admin dashboard data", {
      legacyError: legacyResult.error,
      modernError: modernResult.error,
    });
    return buildAdminDashboard(fallbackAdminRows, true);
  }

  const rows = (modernResult.data || []).map(normalizeDashboardRow);

  if (!rows.length) {
    return buildAdminDashboard(fallbackAdminRows, true);
  }

  return buildAdminDashboard(rows);
}

export async function createAdminProduct(productInput) {
  if (!hasSupabaseConfig || !supabase) {
    return {
      ok: false,
      error: "Chưa cấu hình Supabase. Vui lòng kiểm tra biến môi trường.",
    };
  }

  const name = String(productInput.name || "").trim();
  const brand = String(productInput.brand || "").trim();
  const category = String(productInput.category || "").trim();
  const price = toNumber(productInput.price);

  if (!name || !brand || !category || !price) {
    return {
      ok: false,
      error: "Vui lòng nhập đầy đủ các trường bắt buộc: tên, thương hiệu, danh mục, giá.",
    };
  }

  const row = {
    name,
    slug: toNullableText(productInput.slug) || slugify(name),
    brand,
    category,
    subCategory: toNullableText(productInput.subCategory),
    price,
    salePrice: toNullableNumber(productInput.salePrice),
    image: toNullableText(productInput.image),
    images: splitByComma(productInput.images),
    description: toNullableText(productInput.description),
    details: toNullableText(productInput.details),
    isNew: Boolean(productInput.isNew),
    isSale: Boolean(productInput.isSale),
    isTrending: Boolean(productInput.isTrending),
    inStock: productInput.inStock !== false,
    stock: toNumber(productInput.stock),
    badges: splitByComma(productInput.badges),
    material: toNullableText(productInput.material),
    capacity: toNullableText(productInput.capacity),
    color: toNullableText(productInput.color),
    weight: toNullableText(productInput.weight),
    origin: toNullableText(productInput.origin),
    warranty: toNullableText(productInput.warranty),
    suitableFor: toNullableText(productInput.suitableFor),
    rating: toNumber(productInput.rating),
    reviewCount: toNumber(productInput.reviewCount),
    sold: toNumber(productInput.sold),
  };

  const { error } = await supabase.from("products").insert(row).select("id").single();

  if (error) {
    return {
      ok: false,
      error: error.message || "Không thể thêm sản phẩm. Vui lòng kiểm tra quyền truy cập Supabase.",
    };
  }

  return { ok: true };
}

function normalizeProductDetailRow(row) {
  const price = toNumber(row.price);
  const salePriceRaw = row.salePrice ?? row.sale_price;
  const salePrice = salePriceRaw == null ? null : toNumber(salePriceRaw);
  const salePercentRaw = row.sale_percent;
  let salePercent = toNumber(salePercentRaw);

  if (!salePercent && salePrice != null && salePrice > 0 && price > salePrice) {
    salePercent = Math.round(((price - salePrice) / price) * 100);
  }

  const imageList = Array.isArray(row.images) ? row.images.filter(Boolean) : [];
  const primaryImage = row.image || imageList[0] || "https://via.placeholder.com/720x720?text=Product";
  const gallery = [primaryImage, ...imageList.filter((item) => item !== primaryImage)];

  return {
    id: row.id,
    slug: row.slug || null,
    name: row.name || "Sản phẩm",
    category: row.category_label || row.category || "Khác",
    brand: row.brand || "Đang cập nhật",
    price,
    priceText: toVnd(price),
    salePercent,
    salePrice,
    salePriceText: salePrice ? toVnd(salePrice) : "",
    description: row.description || "Sản phẩm đang được cập nhật mô tả chi tiết.",
    details: row.details || "Thông tin chi tiết sẽ được cập nhật sớm.",
    inStock: row.is_active ?? row.inStock ?? true,
    stock: toNumber(row.stock),
    rating: toNumber(row.rating),
    reviewCount: toNumber(row.reviewCount ?? row.review_count),
    sold: toNumber(row.sold),
    material: row.material || "Đang cập nhật",
    capacity: row.capacity || "Đang cập nhật",
    color: row.color || "Đang cập nhật",
    weight: row.weight || "Đang cập nhật",
    origin: row.origin || "Đang cập nhật",
    warranty: row.warranty || "Đang cập nhật",
    suitableFor: row.suitableFor || row.suitable_for || "Đang cập nhật",
    badges: Array.isArray(row.badges) ? row.badges : [],
    images: gallery,
    updatedAt: formatDateTime(row.updated_at),
  };
}

export async function getProductDetail(productKey) {
  if (!hasSupabaseConfig || !supabase) {
    return null;
  }

  const rawKey = String(productKey || "").trim();
  if (!rawKey) {
    return null;
  }

  const decodedKey = decodeURIComponent(rawKey);
  const numericId = Number(decodedKey);

  const legacyColumns =
    "id, slug, name, category_label, price, sale_percent, image, description, details, is_active, stock, rating, review_count, sold, material, capacity, color, weight, origin, warranty, suitable_for, updated_at";
  const modernColumns =
    'id, slug, name, brand, category, price, "salePrice", image, images, description, details, "inStock", stock, rating, "reviewCount", sold, material, capacity, color, weight, origin, warranty, "suitableFor", badges, updated_at';

  async function findOneByColumns(columns) {
    if (Number.isFinite(numericId) && numericId > 0) {
      const byIdResult = await supabase.from("products").select(columns).eq("id", numericId).maybeSingle();
      if (!byIdResult.error && byIdResult.data) {
        return byIdResult.data;
      }
    }

    const bySlugResult = await supabase.from("products").select(columns).eq("slug", decodedKey).maybeSingle();
    if (!bySlugResult.error && bySlugResult.data) {
      return bySlugResult.data;
    }

    const normalizedName = decodedKey.replace(/-/g, " ");
    const byNameResult = await supabase
      .from("products")
      .select(columns)
      .ilike("name", normalizedName)
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!byNameResult.error && byNameResult.data) {
      return byNameResult.data;
    }

    return null;
  }

  const legacyRow = await findOneByColumns(legacyColumns);
  if (legacyRow) {
    return normalizeProductDetailRow(legacyRow);
  }

  const modernRow = await findOneByColumns(modernColumns);
  if (modernRow) {
    return normalizeProductDetailRow(modernRow);
  }

  return null;
}
