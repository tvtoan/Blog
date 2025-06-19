export function slugifyCategory(name) {
  return name
    .toLowerCase()
    .normalize("NFD") // bỏ dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "") // xóa ký tự dấu
    .replace(/[^a-z0-9]+/g, "-") // thay mọi ký tự đặc biệt, khoảng trắng bằng gạch nối
    .replace(/^-+|-+$/g, ""); // loại bỏ gạch nối đầu/cuối
}
