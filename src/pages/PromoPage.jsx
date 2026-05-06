const PromoPage = () => {
  const promotions = [
    {
      id: 1,
      title: 'Giảm 20% cho áo thể thao',
      description: 'Mua áo thể thao bất kỳ, giảm 20% giá niêm yết',
      validUntil: '30/06/2024',
    },
    {
      id: 2,
      title: 'Khuyến mãi đôi giày',
      description: 'Mua 2 đôi giày, giảm 15% tổng giá tiền',
      validUntil: '15/06/2024',
    },
    {
      id: 3,
      title: 'Quần thể thao sale mùa hè',
      description: 'Tất cả quần thể thao mùa hè giảm lên đến 30%',
      validUntil: '10/07/2024',
    },
    {
      id: 4,
      title: 'Miễn phí vận chuyển',
      description: 'Miễn phí vận chuyển cho đơn hàng từ 500,000 VND',
      validUntil: '30/09/2024',
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Khuyến Mãi Mới Nhất</h1>
        <p>Cập nhật những ưu đãi đặc biệt từ Sports Zone</p>
      </div>

      <div className="page-content">
        <div className="promotions-grid">
          {promotions.map((promo) => (
            <div key={promo.id} className="promo-card">
              <div className="promo-badge">Khuyến mãi</div>
              <h3>{promo.title}</h3>
              <p>{promo.description}</p>
              <div className="promo-footer">
                <span className="promo-validity">Hết hạn: {promo.validUntil}</span>
                <button className="btn-primary-small">Xem chi tiết</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoPage;
