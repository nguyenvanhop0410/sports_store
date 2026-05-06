const GuidelinePage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Hướng Dẫn Mua Hàng</h1>
        <p>Các bước đơn giản để hoàn tất mua hàng tại Sports Zone</p>
      </div>

      <div className="page-content">
        <div className="guideline-content">
          <section className="guideline-section">
            <h2>1. Tìm kiếm và chọn sản phẩm</h2>
            <p>
              Sử dụng thanh tìm kiếm hoặc duyệt các danh mục sản phẩm để tìm những mặt hàng mình cần.
              Bạn có thể lọc theo danh mục, giá cả hoặc sắp xếp theo mức độ phổ biến.
            </p>
            <ul>
              <li>Duyệt từ danh mục (Áo, Quần, Giày, Phụ kiện, Dụng cụ)</li>
              <li>Sử dụng tìm kiếm nhanh</li>
              <li>Áp dụng bộ lọc giá, kích cỡ</li>
            </ul>
          </section>

          <section className="guideline-section">
            <h2>2. Xem chi tiết sản phẩm</h2>
            <p>
              Trước khi mua, hãy xem thông tin chi tiết như mô tả, kích cỡ, màu sắc, giá cả và đánh giá
              từ những khách hàng khác.
            </p>
            <ul>
              <li>Đọc mô tả chi tiết sản phẩm</li>
              <li>Kiểm tra bảng kích cỡ</li>
              <li>Xem ảnh sản phẩm từ nhiều góc độ</li>
              <li>Đọc đánh giá từ khách hàng</li>
            </ul>
          </section>

          <section className="guideline-section">
            <h2>3. Thêm vào giỏ hàng</h2>
            <p>
              Chọn kích cỡ, màu sắc phù hợp, nhập số lượng cần mua và nhấn "Thêm vào giỏ" để lưu sản phẩm.
            </p>
            <ul>
              <li>Chọn kích cỡ và màu sắc</li>
              <li>Nhập số lượng</li>
              <li>Nhấn "Thêm vào giỏ"</li>
              <li>Tiếp tục mua sắm hoặc đi đến giỏ hàng</li>
            </ul>
          </section>

          <section className="guideline-section">
            <h2>4. Kiểm tra giỏ hàng</h2>
            <p>
              Xem lại giỏ hàng, kiểm tra các sản phẩm, số lượng, kích cỡ và giá tiền trước khi thanh toán.
            </p>
            <ul>
              <li>Xem danh sách sản phẩm trong giỏ</li>
              <li>Có thể cập nhật số lượng hoặc xóa sản phẩm</li>
              <li>Xem tổng giá tiền</li>
            </ul>
          </section>

          <section className="guideline-section">
            <h2>5. Thanh toán</h2>
            <p>
              Điền thông tin giao hàng, chọn phương thức thanh toán, xác nhận đơn hàng và hoàn tất thanh toán.
            </p>
            <ul>
              <li>Nhập thông tin người nhận (tên, số điện thoại, địa chỉ)</li>
              <li>Chọn phương thức vận chuyển</li>
              <li>Chọn phương thức thanh toán (Thẻ, ZaloPay, v.v.)</li>
              <li>Kiểm tra lại thông tin</li>
              <li>Hoàn tất thanh toán</li>
            </ul>
          </section>

          <section className="guideline-section">
            <h2>6. Theo dõi đơn hàng</h2>
            <p>
              Sau khi thanh toán thành công, bạn sẽ nhận được email xác nhận. Vào "Đơn hàng của tôi" để
              theo dõi trạng thái giao hàng.
            </p>
            <ul>
              <li>Vào mục "Đơn hàng của tôi"</li>
              <li>Xem chi tiết đơn hàng</li>
              <li>Theo dõi trạng thái giao hàng</li>
            </ul>
          </section>

          <section className="guideline-section">
            <h2>Cần hỗ trợ?</h2>
            <p>
              Nếu gặp bất kỳ vấn đề nào, vui lòng liên hệ với chúng tôi qua:
            </p>
            <ul>
              <li>Hotline: <strong>0823885888</strong></li>
              <li>Email: <strong>support@sportzonestore.vn</strong></li>
              <li>Giờ làm việc: <strong>8:00 - 22:00 hàng ngày</strong></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GuidelinePage;
