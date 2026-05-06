const ShippingPolicyPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Chính Sách Vận Chuyển</h1>
        <p>Thông tin chi tiết về dịch vụ vận chuyển của Sports Zone</p>
      </div>

      <div className="page-content">
        <div className="policy-content">
          <section className="policy-section">
            <h2>1. Phạm vi vận chuyển</h2>
            <p>
              Sports Zone cung cấp dịch vụ vận chuyển đến toàn bộ các tỉnh thành trên cả nước, bao gồm:
            </p>
            <ul>
              <li>Các tỉnh thành trong nước</li>
              <li>Thành phố Hà Nội, TP. Hồ Chí Minh, Đà Nẵng, Hải Phòng, v.v.</li>
              <li>Các vùng sâu, vùng xa (có thể tính phí riêng)</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>2. Thời gian vận chuyển</h2>
            <table className="shipping-table">
              <thead>
                <tr>
                  <th>Khu vực</th>
                  <th>Thời gian giao hàng</th>
                  <th>Phí vận chuyển</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hà Nội, TP. Hồ Chí Minh</td>
                  <td>1-2 ngày làm việc</td>
                  <td>25,000 - 35,000 VND</td>
                </tr>
                <tr>
                  <td>Các tỉnh lân cận (100-300km)</td>
                  <td>2-3 ngày làm việc</td>
                  <td>40,000 - 60,000 VND</td>
                </tr>
                <tr>
                  <td>Các tỉnh xa (trên 300km)</td>
                  <td>3-5 ngày làm việc</td>
                  <td>70,000 - 100,000 VND</td>
                </tr>
                <tr>
                  <td>Vùng sâu, vùng xa</td>
                  <td>5-7 ngày làm việc</td>
                  <td>Tính phí riêng</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="policy-section">
            <h2>3. Miễn phí vận chuyển</h2>
            <p>
              Sports Zone miễn phí vận chuyển cho các đơn hàng đáp ứng điều kiện sau:
            </p>
            <ul>
              <li>Tổng giá trị đơn hàng từ 500,000 VND trở lên</li>
              <li>Áp dụng cho Hà Nội, TP. Hồ Chí Minh, Đà Nẵng</li>
              <li>Không áp dụng cho các vùng sâu, vùng xa</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Phương thức vận chuyển</h2>
            <p>
              Chúng tôi hợp tác với các đơn vị vận chuyển uy tín:
            </p>
            <ul>
              <li>Giao hàng tiết kiệm</li>
              <li>Nhanh chóng và an toàn</li>
              <li>Có đảm bảo hàng hóa</li>
              <li>Hỗ trợ COD (thanh toán khi nhận hàng)</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>5. Quy trình giao hàng</h2>
            <ol>
              <li>Khách hàng đặt hàng và thanh toán</li>
              <li>Sports Zone kiểm tra và chuẩn bị hàng hóa</li>
              <li>Bàn giao cho đơn vị vận chuyển</li>
              <li>Khách hàng nhận được thông báo theo dõi (tracking)</li>
              <li>Hàng tới địa chỉ được ghi trong đơn</li>
              <li>Khách hàng nhận hàng và kiểm tra</li>
            </ol>
          </section>

          <section className="policy-section">
            <h2>6. Trách nhiệm của Sports Zone</h2>
            <ul>
              <li>Đóng gói hàng hóa chắc chắn, an toàn</li>
              <li>Giao hàng đúng thời hạn</li>
              <li>Bảo hiểm giá trị hàng hóa</li>
              <li>Hỗ trợ xử lý nếu hàng bị hỏng, mất trong quá trình vận chuyển</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>7. Hàng hóa bị hỏng hoặc mất</h2>
            <p>
              Nếu hàng hóa bị hỏng hoặc mất trong quá trình vận chuyển:
            </p>
            <ul>
              <li>Khách hàng phải thông báo trong vòng 24 giờ</li>
              <li>Cung cấp ảnh chứng minh hàng hóa bị hỏng</li>
              <li>Sports Zone sẽ hỗ trợ đổi hàng hoặc hoàn tiền</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>8. Liên hệ hỗ trợ</h2>
            <p>
              Để cập nhật thông tin vận chuyển hoặc có thắc mắc, vui lòng liên hệ:
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

export default ShippingPolicyPage;
