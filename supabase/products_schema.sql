create table if not exists public.products (
  id bigint generated always as identity primary key,
  category_slug text not null,
  category_label text not null,
  name text not null,
  old_price numeric(12, 0),
  price numeric(12, 0) not null,
  sale_percent int,
  image text not null,
  is_active boolean not null default true,
  is_sidebar boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_slug_idx on public.products (category_slug);
create index if not exists products_is_sidebar_idx on public.products (is_sidebar);

create or replace function public.set_products_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
before update on public.products
for each row
execute function public.set_products_updated_at();

alter table public.products enable row level security;

drop policy if exists "Public read products" on public.products;
create policy "Public read products"
on public.products
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Authenticated insert products" on public.products;
create policy "Authenticated insert products"
on public.products
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated update products" on public.products;
create policy "Authenticated update products"
on public.products
for update
to authenticated
using (true)
with check (true);

insert into public.products (category_slug, category_label, name, old_price, price, sale_percent, image, is_sidebar, sort_order)
values
  ('ban-an', 'BÀN ĂN', 'Bộ bàn ăn 6 ghế biznoithat BA-013a', 15698000, 15247000, 3, 'https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/9-300x300.jpg', false, 1),
  ('ban-an', 'BÀN ĂN', 'Bộ bàn ăn 6 ghế xuất khẩu Nhật biznoithat BG-137B', 11098000, 10980000, 1, 'https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/3-1-300x300.jpg', false, 2),
  ('tu-bep', 'TỦ BẾP', 'Tủ bếp gỗ sồi hiện đại cánh kính', 18650000, 17900000, 4, 'https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/3-1-300x300.jpg', false, 1),
  ('tu-bep', 'TỦ BẾP', 'Tủ bếp chữ L phủ acrylic chống ẩm', 22900000, 21480000, 6, 'https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/4-1-300x300.jpg', false, 2),
  ('may-hut-mui', 'MÁY HÚT MÙI', 'Máy hút mùi kính cong KAFF KF-GB 902', 5862000, 5742000, 2, 'https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/04-1-300x300.jpg', true, 1),
  ('may-hut-mui', 'MÁY HÚT MÙI', 'Máy hút mùi Eurosun EH70K20', 8050000, 7856000, 2, 'https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/4-1-300x300.jpg', true, 2),
  ('may-hut-mui', 'MÁY HÚT MÙI', 'Máy hút mùi kính cong KAFF KF-GB 906', 7852000, 7589000, 3, 'https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/03-1-300x300.jpg', true, 3),
  ('may-hut-mui', 'MÁY HÚT MÙI', 'Máy hút khói cổ điển Maloca H392.7B', 4582000, 4369000, 5, 'https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/3-1-300x300.jpg', true, 4),
  ('may-hut-mui', 'MÁY HÚT MÙI', 'Canzy CZ-3470', 4582200, 4358000, 5, 'https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/02-1-300x300.jpg', true, 5)
on conflict do nothing;
