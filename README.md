# Mosaic — không gian trình duyệt trên web

Mosaic là một ứng dụng web tĩnh mô phỏng không gian trình duyệt, viết bằng **HTML, CSS và JavaScript thuần**. Có thể đưa trực tiếp lên GitHub Pages; không cần Node.js, thư viện bên ngoài hay máy chủ phía sau.

## Tính năng

- Mở, chuyển, đóng, nhân bản và mở lại thẻ vừa đóng.
- Chia đôi không gian thành hai vùng độc lập; nhấn vào vùng muốn điều khiển, rồi chọn thẻ. Kéo thanh ở giữa để thay đổi kích thước. Trên màn hình nhỏ, hai vùng được xếp dọc.
- Thanh địa chỉ, tải lại, quay lại / tiến tới các địa chỉ đã mở **trong Mosaic**, và nút mở trang trong tab trình duyệt thật.
- Tìm kiếm bằng Google, DuckDuckGo hoặc Bing trong tab trình duyệt thật.
- Dấu trang, lối tắt tùy chỉnh và lịch sử các thao tác điều hướng trong Mosaic.
- Ghi chú tự lưu, sao chép ghi chú, đồng hồ tập trung 25 phút, giao diện tối.
- Lưu phiên, thẻ, dấu trang, lịch sử, ghi chú, cài đặt và trạng thái đồng hồ trên thiết bị bằng `localStorage` khi trình duyệt cho phép.

## Chạy thử trên máy

Giải nén dự án, mở terminal trong thư mục `mosaic-browser` và chạy:

```bash
python3 -m http.server 8000
```

Mở `http://localhost:8000`. Bạn cũng có thể dùng một máy chủ tĩnh bất kỳ; không có bước cài đặt hoặc biên dịch.

## Đăng lên GitHub Pages

1. Tạo một repository mới trên GitHub.
2. Đưa **nội dung bên trong** thư mục `mosaic-browser` lên thư mục gốc của repository. Thư mục gốc phải chứa `index.html`, `styles.css`, `app.js` và thư mục `assets/`.
3. Trên GitHub, vào **Settings → Pages**. Ở phần **Build and deployment**, chọn **Deploy from a branch**; chọn nhánh `main` và thư mục `/(root)`, rồi bấm **Save**.
4. Chờ GitHub xuất bản, sau đó mở địa chỉ được hiển thị trong trang Pages. Với repository thông thường, địa chỉ có dạng `https://TEN-NGUOI-DUNG.github.io/TEN-REPOSITORY/`.

Ví dụ nếu dùng Git từ trong thư mục dự án:

```bash
git init
git add .
git commit -m "Tạo Mosaic browser"
git branch -M main
git remote add origin https://github.com/TEN-NGUOI-DUNG/TEN-REPOSITORY.git
git push -u origin main
```

Thay `TEN-NGUOI-DUNG` và `TEN-REPOSITORY` bằng thông tin thật của bạn. GitHub có thể yêu cầu đăng nhập hoặc cấu hình xác thực Git.

## Cách dùng nhanh

- Bấm **+** ở hàng thẻ để tạo thẻ mới. Chọn một vùng trước, sau đó bấm thẻ để hiển thị thẻ đó trong vùng đang chọn.
- Bấm **Chia đôi** ở góc trên; kéo vạch ngăn hoặc dùng phím mũi tên khi vạch ngăn được chọn.
- Nhập `example.com` hoặc một URL đầy đủ vào thanh địa chỉ. Nếu không ghi giao thức, Mosaic thử `https://`. Từ khóa không giống địa chỉ web sẽ được tìm kiếm ở tab trình duyệt mới.
- Bấm ngôi sao trên thanh địa chỉ để thêm hoặc bỏ dấu trang của trang hiện tại. Tại **Dấu trang**, có thể thêm lối tắt và chọn mở lối tắt đó bên ngoài.
- **Ctrl/⌘ + T**: thẻ mới; **Ctrl/⌘ + W**: đóng thẻ; **Ctrl/⌘ + Shift + T**: mở lại thẻ vừa đóng; **Ctrl/⌘ + L**: thanh địa chỉ; **Ctrl/⌘ + R**: tải lại; **Alt + ← / →**: quay lại / tiến tới. Trình duyệt thật có thể giữ quyền ưu tiên một số phím tắt, đặc biệt khi con trỏ đang ở trong một website nhúng.

## Giới hạn quan trọng

Mosaic là **website mô phỏng**, không phải trình duyệt độc lập đầy đủ:

- Trang web được hiển thị bằng `iframe`. Nhiều website (ví dụ GitHub, Google, YouTube) từ chối nhúng bằng `X-Frame-Options` hoặc Content Security Policy. Mosaic không thể và không tìm cách vượt qua chính sách này; hãy bấm **Mở bên ngoài**. Các lối tắt GitHub và YouTube mặc định mở ngoài để tránh màn hình bị chặn.
- Không có cách đáng tin cậy từ JavaScript phía trang để xác định mọi lỗi chặn nhúng. Vì vậy thông báo “Trang không hiển thị?” luôn hiện phía trên trang nhúng. Trên website HTTPS, trang HTTP còn có thể bị trình duyệt chặn vì nội dung hỗn hợp.
- Do chính sách cùng nguồn gốc, Mosaic không thể đọc URL, tiêu đề hay lịch sử của các liên kết được bấm **bên trong** trang nhúng từ nguồn khác. Thanh địa chỉ và nút quay lại/tiến tới chỉ phản ánh các lần điều hướng được thực hiện trong giao diện Mosaic; tải lại mở lại địa chỉ được ghi nhận đó.
- Website nhúng cũng có thể hạn chế đăng nhập, cookie, tải tệp, cửa sổ bật lên hoặc quyền truy cập vì chính sách của trình duyệt và sandbox. Nếu một tính năng không hoạt động, hãy mở trang trong trình duyệt thật.
- Dữ liệu `localStorage` chỉ nằm trong hồ sơ trình duyệt và nguồn gốc hiện tại, không đồng bộ giữa thiết bị. Chế độ riêng tư, xóa dữ liệu trang hoặc thay đổi trình duyệt có thể làm mất dữ liệu. Nếu lưu trữ bị chặn, ứng dụng vẫn chạy nhưng không giữ lại phiên sau khi đóng.
- Mosaic không có máy chủ riêng; tuy nhiên các website được truy cập và công cụ tìm kiếm vẫn nhận yêu cầu theo chính sách riêng của họ. Tính năng tìm kiếm và các lối tắt mở ngoài có thể cần cho phép mở tab/cửa sổ bật lên.

## Cấu trúc

```text
mosaic-browser/
├── index.html
├── styles.css
├── app.js
├── README.md
└── assets/
    ├── favicon.svg
    ├── horizon.jpg
    ├── fonts.css
    └── fonts/
```

Phông chữ **Be Vietnam Pro** và **Lora** được phân phối theo SIL Open Font License 1.1; các bản giấy phép đi kèm trong `assets/fonts/`. Ảnh nền được tạo bằng AI.
