import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"], // Hỗ trợ tiếng Việt
  weight: ["300", "400", "500", "600", "700"], // Các mức độ đậm: thường và đậm
  display: "swap", // Tối ưu hóa hiển thị
});
