import { hasSupabaseConfig, supabase } from "./supabaseClient";

function toVnd(value) {
  return Number(value || 0).toLocaleString("vi-VN") + " ₫";
}

function mapProductRow(row) {
  return {
    id: row.id,
    category: row.category_label,
    name: row.name,
    oldPrice: row.old_price ? toVnd(row.old_price) : "",
    price: toVnd(row.price),
    sale: row.sale_percent ? `-${row.sale_percent}%` : "",
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

export async function getCategoryProducts(categorySlug) {
  if (!hasSupabaseConfig || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, category_label, name, old_price, price, sale_percent, image, sort_order")
    .eq("category_slug", categorySlug)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("id", { ascending: false });

  if (error) {
    console.error("Cannot load products from Supabase", error);
    return [];
  }

  return (data || []).map(mapProductRow);
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
