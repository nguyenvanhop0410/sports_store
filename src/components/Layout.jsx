import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import sportsZoneLogo from '../../—Pngtree—vintage saturn ring soccer ball_24050200.png';

const Layout = () => {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const { totalQuantity } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('q') || '');
  }, [location.search]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/?q=${encodeURIComponent(query)}` : '/');
  };

  const categories = [
    { name: 'Áo', slug: 'ao' },
    { name: 'Quần', slug: 'quan' },
    { name: 'Giày', slug: 'giay' },
    { name: 'Phụ kiện', slug: 'phu-kien' },
    { name: 'Dụng cụ', slug: 'dung-cu' },
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand-row">
            <Link className="brand" to="/">
              <img className="brand-badge" src={sportsZoneLogo} alt="Sports Zone logo" />
              <span className="brand-copy">
                <strong>SPORTS ZONE</strong>
                <small>YOUR ATHLETIC HUB</small>
              </span>
            </Link>
          </div>
          <form className="header-search" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Tìm sản phẩm..."
              aria-label="Tìm sản phẩm"
            />
          </form>

          <div className="header-actions">
            <a className="support-pill" href="tel:0823885888">
              <svg className="icon-small" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.92 7.02C17.45 6.18 16.84 5.5 16.08 5.09c-.73-.41-1.53-.61-2.33-.61-1.41 0-2.73.56-3.69 1.52S8.16 8.77 8.16 10.18c0 .79.2 1.59.61 2.33.41.73 1.09 1.34 1.92 1.81.84.47 1.75.71 2.68.71 1.41 0 2.73-.56 3.69-1.52.96-.96 1.52-2.28 1.52-3.69 0-.79-.2-1.59-.61-2.33zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3m8.97-10.24c.41.73.62 1.53.62 2.34 0 1.41-.56 2.73-1.52 3.69-.96.96-2.28 1.52-3.69 1.52-.79 0-1.59-.2-2.33-.61-.73-.41-1.34-1.09-1.81-1.92-.47-.84-.71-1.75-.71-2.68 0-1.41.56-2.73 1.52-3.69.96-.96 2.28-1.52 3.69-1.52.79 0 1.59.2 2.33.61.73.41 1.34 1.09 1.81 1.92.47.84.71 1.75.71 2.68z"/>
              </svg>
              <span>Tư vấn 0823885888</span>
            </a>
            <NavLink className="action-link" to="/cart">
              <svg className="icon-small" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <span>Giỏ hàng ({totalQuantity})</span>
            </NavLink>
            {!isAuthenticated ? (
              <NavLink className="account-link" to="/login">
                <svg className="icon-small" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span>Tài khoản</span>
              </NavLink>
            ) : (
              <>
                <span className="user-pill">Xin chào, {user?.name}</span>
                <button className="action-link" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        </div>
        <nav className="category-bar">
          <div className="category-bar-inner">
            <NavLink end to="/" className="category-link">
              Trang chủ
            </NavLink>
            {categories.map((category) => (
              <NavLink
                key={category.slug}
                to={`/category/${category.slug}`}
                className="category-link"
              >
                {category.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main className="page">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <section className="footer-block footer-info">
            <h4>HỖ TRỢ KHÁCH HÀNG</h4>
            <p className="shop-name">Mua sắm dễ dàng, hỗ trợ nhanh chóng</p>
            <p><strong>Hotline:</strong> 0823885888</p>
            <p><strong>Email:</strong> support@sportzonestore.vn</p>
            <p><strong>Giờ làm việc:</strong> 8:00 - 22:00 hàng ngày</p>
          </section>

          <section className="footer-block footer-about">
            <h4>KHÁM PHÁ</h4>
            <ul>
              <li><Link to="/">Trang chủ</Link></li>
              <li><Link to="/category/ao">Danh mục sản phẩm</Link></li>
              <li><Link to="/promo">Khuyến mãi mới nhất</Link></li>
              <li><Link to="/blog">Blog thể thao</Link></li>
            </ul>
          </section>

          <section className="footer-block footer-policy">
            <h4>HỖ TRỢ & HƯỚNG DẪN</h4>
            <ul>
              <li><Link to="/guideline">Hướng dẫn mua hàng</Link></li>
              <li><Link to="/shipping-policy">Chính sách vận chuyển</Link></li>
              <li><Link to="/return-policy">Chính sách hoàn trả</Link></li>
              <li><Link to="/terms">Điều khoản dịch vụ</Link></li>
            </ul>
          </section>

          <section className="footer-block footer-social-top">
            <h4>KẾT NỐI VỚI CHÚNG TÔI</h4>
            <div className="social-icons" aria-label="Liên kết mạng xã hội">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook" className="social-icon facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter" className="social-icon twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 002.856-3.51 9.958 9.958 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube" className="social-icon youtube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" className="social-icon instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2.17" y="2.17" width="19.66" height="19.66" rx="4.58" ry="4.58" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="5.57" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="18.3" cy="5.7" r="1.3" fill="currentColor"/>
                </svg>
              </a>
            </div>
            <div style={{ marginTop: '16px' }}>
              <h5 style={{ fontSize: '0.95rem', marginBottom: '12px', fontWeight: '600' }}>Thanh toán an toàn</h5>
              <div className="payment-logos">
                <a href="#/" title="Mastercard" className="payment-logo">
                  <svg viewBox="0 0 48 32" fill="none">
                    <rect width="48" height="32" rx="4" fill="white" stroke="#E0E0E0" strokeWidth="1"/>
                    <circle cx="16" cy="16" r="7" fill="#EB001B"/>
                    <circle cx="32" cy="16" r="7" fill="#F79E1B"/>
                  </svg>
                </a>
                <a href="#/" title="Visa" className="payment-logo">
                  <svg viewBox="0 0 48 32" fill="none">
                    <rect width="48" height="32" rx="4" fill="white" stroke="#E0E0E0" strokeWidth="1"/>
                    <text x="24" y="20" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#1A1F71">VISA</text>
                  </svg>
                </a>
                <a href="#/" title="JCB" className="payment-logo">
                  <svg viewBox="0 0 48 32" fill="none">
                    <rect width="48" height="32" rx="4" fill="white" stroke="#E0E0E0" strokeWidth="1"/>
                    <text x="24" y="20" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#0066B2">JCB</text>
                  </svg>
                </a>
                <a href="#/" title="ZaloPay" className="payment-logo">
                  <svg viewBox="0 0 48 32" fill="none">
                    <rect width="48" height="32" rx="4" fill="white" stroke="#E0E0E0" strokeWidth="1"/>
                    <text x="24" y="20" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#0084FF">ZaloPay</text>
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </div>

        <div className="footer-middle">
          <div className="footer-left">
            <div className="footer-company-info">
              <h3>SPORTS ZONE</h3>
              <p className="company-desc">CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ NỘI DUNG SỐ VIỆT</p>
              <p><strong>Mã số thuế:</strong> 0100108007</p>
              <p><strong>Người chịu trách nhiệm:</strong> Trần Thủy Chi</p>
              <p><strong>Địa chỉ:</strong> Số 9 Đinh Lễ, P. Hoàn Kiếm, Hà Nội</p>
              <p><strong>Văn phòng giao dịch:</strong> 25BT2 bán đảo Linh Đàm, P. Hoàng Liệt, Quận Hoàng Mai, TP. Hà Nội</p>
              <p><strong>Điện thoại:</strong> 0823885888</p>
              <p><strong>Email:</strong> sportsupport@sporthub.vn</p>
              <div className="cert-badge">Đã thông báo Bộ Công Thương</div>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-map-container">
              <h4>Địa chỉ của chúng tôi</h4>
              <iframe 
                title="Sports Zone Map"
                width="100%" 
                height="280" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9654797845247!2d105.85308531533695!3d21.02862779196408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab46b62dfc65%3A0x8b1b1b1b1b1b1b1b!2zTmnhu4tuIEzDqiBFdmVudCBDZW50ZXIsIDkgxJDDrW5oIEzDqSwgSG_DoG4gS2nEg20sIEjDoCBO4buZaSAxMDAwMDA!5e0!3m2!1svi!2s!4v1234567890" 
                style={{ border: 0, borderRadius: '8px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p style={{ textAlign: 'center', margin: '0', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.75)' }}>
            © 2024 Sports Zone Store. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
