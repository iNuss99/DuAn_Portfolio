# 🌐 Portfolio Lập Trình Viên & Thiết Kế Web - Khoa

Đây là trang đích Portfolio cá nhân cao cấp dành cho **Khoa**, được xây dựng trên nền tảng **React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion** với các hiệu ứng tương tác 3D và Hologram hiện đại.

---

## ⚡ Các Tính Năng Nổi Bật
- **Hologram 3D Robot Portrait**: Chân dung 3D tương tác bám đuổi chuột (Magnet) kết hợp vòng xoay 3D hologram, laser quét và hiệu ứng phát sáng.
- **Mạng lưới hạt (Particle Background)**: Nền canvas di động mượt mà tạo cảm giác futuristic.
- **3D Tilt Cards**: Nghiêng 3D các thẻ dịch vụ kèm luồng sáng phản chiếu di chuyển theo con trỏ chuột.
- **3D Image Flip**: Lật nhẹ 3D các ảnh dự án khi hover.
- **Cursor Glow Trail**: Vòng tròn sáng gradient bám theo chuột toàn trang.
- **Sticky Stacking Cards**: Các dự án cuộn chồng xếp lớp như tab với tính toán khoảng cách tự động để không bị đè chữ.
- **Form Liên Hệ Google Sheets**: Lưu trực tiếp thông tin khách hàng đăng ký vào trang tính Google Sheets của bạn.

---

## 🛠️ Hướng dẫn liên kết Google Sheets

Để nhận tin nhắn từ form liên hệ trực tiếp vào Google Sheets, hãy làm theo các bước sau:

### Bước 1: Tạo Google Sheet mới
1. Truy cập [Google Sheets](https://sheets.google.com/) và tạo một bảng tính trống.
2. Đặt tên bảng tính tùy ý (ví dụ: *Lịch sử Liên hệ - Khoa*).

### Bước 2: Thiết lập Apps Script
1. Trên thanh công cụ, chọn **Tiện ích mở rộng** (Extensions) -> **Apps Script**.
2. Xóa toàn bộ code mặc định trong file `Mã.gs` (hoặc `Code.gs`) và dán vào đoạn code dưới đây:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Tạo hàng tiêu đề nếu trang tính chưa có dữ liệu
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Họ và Tên", "Số điện thoại", "Email", "Dịch vụ quan tâm", "Nội dung yêu cầu", "Thời gian"]);
    }
    
    // Ghi dữ liệu khách hàng gửi từ Form
    sheet.appendRow([
      data.fullName,
      data.phone,
      data.email,
      data.projectType,
      data.message,
      data.timestamp
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Apps Script đang hoạt động ổn định!");
}
```

### Bước 3: Triển khai ứng dụng Web (Deploy)
1. Nhấn nút **Triển khai** (Deploy) ở góc trên bên phải -> Chọn **Triển khai mới** (New deployment).
2. Nhấp vào biểu tượng bánh răng bên cạnh mục *Chọn loại triển khai* (Select type) -> Chọn **Ứng dụng web** (Web app).
3. Cấu hình triển khai:
   - **Mô tả**: Ghi chú tùy ý (ví dụ: *Form liên hệ portfolio*).
   - **Thực thi dưới danh nghĩa (Execute as)**: Chọn **Tôi** (Me).
   - **Ai có quyền truy cập (Who has access)**: Chọn **Bất kỳ ai** (Anyone). *(Đây là tùy chọn bắt buộc để API của website gửi được dữ liệu).*
4. Nhấn **Triển khai** (Deploy). 
5. Cấp quyền truy cập nếu Google yêu cầu (Nhấp vào *Xem xét quyền hạn* -> Chọn tài khoản Google của bạn -> Nhấp *Nâng cao* -> Chọn *Đi tới dự án (không an toàn)* -> Nhấp *Cho phép*).
6. Sao chép **URL của ứng dụng web** (có dạng `https://script.google.com/macros/s/.../exec`).

### Bước 4: Cấu hình vào mã nguồn
1. Mở file `src/data/portfolioData.ts`.
2. Tìm dòng `googleSheetUrl` và điền URL vừa sao chép ở Bước 3 vào:
   ```typescript
   googleSheetUrl: "https://script.google.com/macros/s/.../exec",
   ```
3. Sau khi lưu file, dữ liệu liên hệ từ website sẽ tự động được gửi và ghi nhận trong bảng tính Google Sheet của bạn!

---

## 🚀 Hướng dẫn triển khai lên Vercel

Để triển khai dự án lên hosting Vercel miễn phí và nhanh chóng, bạn có hai lựa chọn dưới đây:

### Cách 1: Sử dụng Vercel CLI (Nhanh nhất)
1. Mở terminal tại thư mục gốc của dự án:
   ```bash
   npm install -g vercel
   ```
2. Chạy lệnh triển khai:
   ```bash
   vercel
   ```
3. Đăng nhập nếu được hỏi, chọn thiết lập mặc định bằng cách nhấn liên tiếp `Enter`.
4. Khi chạy xong, Vercel sẽ cung cấp link preview. Để xuất bản bản chính thức (Production), hãy chạy:
   ```bash
   vercel --prod
   ```

### Cách 2: Triển khai qua GitHub (Khuyên dùng để tự động cập nhật)
1. Tạo một Repository mới trên tài khoản GitHub của bạn.
2. Đẩy toàn bộ mã nguồn của dự án lên GitHub:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin <LINK_REPOSITORY_GITHUB_CUA_BAN>
   git push -u origin main
   ```
3. Truy cập [Vercel Dashboard](https://vercel.com/dashboard) -> Chọn **Add New** -> **Project**.
4. Liên kết với tài khoản GitHub của bạn, tìm Repository vừa tạo và chọn **Import**.
5. Trong phần *Framework Preset*, Vercel sẽ tự động nhận diện dự án là **Vite**. Nhấn nút **Deploy** mà không cần thay đổi cấu hình nào khác.
6. Mỗi khi bạn thực hiện `git push` mã nguồn mới lên GitHub, Vercel sẽ tự động biên dịch và cập nhật trang web.
