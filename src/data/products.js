const commonProducts = [
  {
    category: "BÀN ĂN",
    name: "Bộ bàn ghế ăn gỗ xoan đào",
    oldPrice: "6.549.000",
    price: "6.324.000 VND",
    sale: "-3%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/4-1-300x300.jpg",
  },
  {
    category: "CÁC LOẠI BẾP",
    name: "Bếp gas âm Goldsun",
    oldPrice: "6.950.000",
    price: "6.742.000 VND",
    sale: "-3%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/bg-300x300.jpg",
  },
  {
    category: "GHẾ ĂN",
    name: "Ghế bàn ăn Thyholm Basic",
    oldPrice: "990.000",
    price: "975.000 VND",
    sale: "-2%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/3616950-300x300.jpg",
  },
  {
    category: "MÁY HÚT MÙI",
    name: "Máy hút khói cổ điển Maloca",
    oldPrice: "4.582.000",
    price: "4.369.000 VND",
    sale: "-5%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/3-1-300x300.jpg",
  },
  {
    category: "LÒ VI SÓNG",
    name: "Lò vi sóng có nướng Sharp",
    oldPrice: "4.550.000",
    price: "4.159.000 VND",
    sale: "-9%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/011-300x300.jpg",
  },
  {
    category: "BÀN ĂN",
    name: "Bộ bàn ghế ăn gỗ cao su",
    oldPrice: "5.050.000",
    price: "4.956.000 VND",
    sale: "-2%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/5-300x300.jpg",
  },
  {
    category: "CÁC LOẠI BẾP",
    name: "Bếp gas âm kính Apex",
    oldPrice: "6.987.000",
    price: "6.575.000 VND",
    sale: "-6%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/bg02-300x300.jpg",
  },
  {
    category: "GHẾ ĂN",
    name: "Ghế bàn ăn Gislevi",
    oldPrice: "2.570.000",
    price: "2.352.000 VND",
    sale: "-8%",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/6-300x300.jpg",
  },
];

export const featuredCarouselProducts = [...commonProducts, ...commonProducts.slice(0, 2)];

export const tabLabels = [
  { key: "new", label: "SẢN PHẨM MỚI" },
  { key: "best", label: "BÁN CHẠY NHẤT" },
  { key: "sale", label: "ĐANG KHUYẾN MÃI" },
];

export const categorySections = [
  {
    key: "ban-an",
    title: "BÀN ĂN",
    color: "red",
    promoImage: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/dsa.jpg",
    promoOnLeft: true,
    tabs: {
      new: commonProducts,
      best: commonProducts.slice(0, 8).reverse(),
      sale: commonProducts.slice(2, 8).concat(commonProducts.slice(0, 2)),
    },
  },
  {
    key: "tu-lanh",
    title: "TỦ LẠNH",
    color: "orange",
    promoImage: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/cvg.jpg",
    promoOnLeft: false,
    tabs: {
      new: commonProducts.slice(1).concat(commonProducts.slice(0, 1)),
      best: commonProducts.slice(0, 8),
      sale: commonProducts.slice(3).concat(commonProducts.slice(0, 3)),
    },
  },
  {
    key: "cac-loai-bep",
    title: "CÁC LOẠI BẾP",
    color: "blue",
    promoImage: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/04/trrt.jpg",
    promoOnLeft: true,
    tabs: {
      new: commonProducts.slice(2).concat(commonProducts.slice(0, 2)),
      best: commonProducts.slice(1, 9).concat(commonProducts.slice(0, 1)),
      sale: commonProducts.slice(0, 8),
    },
  },
];

export const consumerNews = [
  {
    title: "Chac khoe xuong voi phuong phap don gian bat ngo",
    excerpt: "Khong can mat nhieu thoi gian hay suc luc, ban co the thuc hien nhung meo huu ich moi ngay.",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/xuongChacNguoiKhoe-300x158.jpg",
  },
  {
    title: "Bat ngo voi cong dung than thanh cua thuc pham chuc nang",
    excerpt: "Truoc anh huong tieu cuc cua moi truong, viec cham soc suc khoe can dung cach va dung luc.",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/xcongDungTPCN-300x158.jpg",
  },
  {
    title: "Kham pha cong dung cua tao luc hoang gia Nhat Ban",
    excerpt: "Nhung thong tin duoc tong hop giup ban hieu hon ve gia tri bo sung dinh duong hang ngay.",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/xcongDungTaoHoangGia-300x158.jpg",
  },
  {
    title: "Cong dung cua collagen trung ca hoi co gi vuot troi",
    excerpt: "Tong hop cach su dung va lua chon san pham phu hop voi nhu cau lam dep cua tung doi tuong.",
    image: "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/xnuoc_uong_ca_hoi-300x220.jpg",
  },
];

export const topBrandLogos = [
  "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/cle-de-peau-beaute-nhat-ban_218x123.jpg",
  "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/kanebo-nhat-ban_218x123.png",
  "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/kewpie-nhat-ban_218x123.png",
  "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/menard-nhat-ban_218x123.jpg",
  "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/nagano-nhat-ban_218x123.jpg",
  "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/naris-nhat-ban_218x123.jpg",
  "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/rohtonhat-ban_218x123.png",
  "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/transino-nhat-ban_218x123.jpg",
  "https://mauweb.monamedia.net/noithatbep/wp-content/uploads/2018/03/zojirushi-nhat-ban_218x123.png",
];
