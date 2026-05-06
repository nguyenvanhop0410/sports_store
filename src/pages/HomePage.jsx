import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { apiRequest } from '../utils/api';

const HERO_SLIDES = [
  {
    title: 'Chạy bền, tập mạnh, sống khỏe',
    description:
      'Giày, áo, quần và phụ kiện thể thao được chọn lọc cho người yêu vận động. Tối ưu cho cả tập luyện và sử dụng hằng ngày.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80',
    badge: 'Bộ sưu tập chạy bộ',
  },
  {
    title: 'Trang phục tập luyện thoáng khí',
    description:
      'Thiết kế thoải mái, thấm hút tốt và giữ form đẹp trong mọi buổi tập từ gym đến yoga và bóng đá.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80',
    badge: 'Áo và trang phục',
  },
  {
    title: 'Phụ kiện hỗ trợ hiệu suất',
    description:
      'Từ bình nước, dây kháng lực đến găng tay và dụng cụ tập luyện, mọi thứ bạn cần đều ở đây.',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=80',
    badge: 'Phụ kiện và dụng cụ',
  },
];

const PROMO_FEATURES = [
  {
    title: 'Vận chuyển SIÊU TỐC',
    subtitle: 'Khu vực TOÀN QUỐC',
    icon: 'delivery',
  },
  {
    title: 'Cam kết CHÍNH HÃNG',
    subtitle: 'Sản phẩm TRỌN ĐỜI',
    icon: 'shield',
  },
  {
    title: 'Tiến hành THANH TOÁN',
    subtitle: 'Với nhiều PHƯƠNG THỨC',
    icon: 'wallet',
  },
  {
    title: '100% HOÀN TIỀN',
    subtitle: 'Nếu sản phẩm lỗi',
    icon: 'refund',
  },
];

const PROMO_SLIDES = [
  {
    badge: 'Rise Beyond 2026',
    title: 'Bộ sưu tập thi đấu lấy cảm hứng đội tuyển',
    description:
      'Áo khoác, training kit và phụ kiện nổi bật với sắc đỏ mạnh mẽ, phù hợp cho tập luyện và xuống phố.',
    image:
      'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1400&q=80',
    linkTo: '/category/ao',
    linkLabel: 'Khám phá bộ sưu tập',
  },
  {
    badge: 'Performance Line',
    title: 'Chất liệu nhẹ, form gọn, lên hình nổi bật',
    description:
      'Các thiết kế mới ưu tiên độ thoáng, co giãn và cảm giác mặc gọn gàng cho người chơi thể thao hiện đại.',
    image:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=80',
    linkTo: '/category/giay',
    linkLabel: 'Xem sản phẩm nổi bật',
  },
];

const CATEGORY_ORDER = ['Áo', 'Quần', 'Giày', 'Phụ kiện', 'Dụng cụ'];

const CATEGORY_TITLES = {
  'Áo': 'Trang phục thể thao',
  'Quần': 'Quần tập và quần thể thao',
  'Giày': 'Giày thể thao và giày chuyên dụng',
  'Phụ kiện': 'Phụ kiện hỗ trợ tập luyện',
  'Dụng cụ': 'Dụng cụ và thiết bị tập luyện',
};

const normalizeText = (value) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

const sortByNewest = (products) =>
  [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const sortByPriceAsc = (products) => [...products].sort((a, b) => a.price - b.price);

const sortByFeatured = (products) =>
  [...products].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

const PromoFeatureIcon = ({ type }) => {
  switch (type) {
    case 'delivery':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M3 7.5h10v7H3zM13 9h3.6l2.4 2.4v3.1H13zM7 18.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm10 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM5 7.5V5h6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3.5 19 6v5.9c0 4.4-3 7.8-7 8.6-4-.8-7-4.2-7-8.6V6l7-2.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="m9.3 12.1 1.9 1.9 3.8-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'wallet':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 7.5h14a2 2 0 0 1 2 2v7H6a2 2 0 0 1-2-2v-7Zm0 0L16.5 4H20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.5 12h.01"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'refund':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M8.2 8.2A5.5 5.5 0 1 1 6.7 14H4m0 0 2.3-2.3M4 14l2.3 2.3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8.8v6.4m-1.7-4.7h2.4a1.2 1.2 0 1 1 0 2.4h-1.4a1.2 1.2 0 1 0 0 2.4h2.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
};

const HomePage = () => {
  const location = useLocation();
  const [slideIndex, setSlideIndex] = useState(0);
  const [promoIndex, setPromoIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPromoIndex((current) => (current + 1) % PROMO_SLIDES.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await apiRequest('/products');
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const groupedProducts = useMemo(() => {
    const query = normalizeText(searchQuery);

    return CATEGORY_ORDER.reduce((accumulator, category) => {
      const matchedProducts = products.filter((product) => {
        const matchesCategory = normalizeText(product.category) === normalizeText(category);
        const matchesQuery =
          !query ||
          [product.name, product.description, product.brand, product.category].some((field) =>
            normalizeText(field).includes(query)
          );

        return matchesCategory && matchesQuery;
      });
      accumulator[category] = matchedProducts;
      return accumulator;
    }, {});
  }, [products, searchQuery]);

  const featuredCollections = useMemo(() => {
    const query = normalizeText(searchQuery);

    const applySearch = (items) =>
      !query
        ? items
        : items.filter((product) =>
            [product.name, product.description, product.brand, product.category].some((field) =>
              normalizeText(field).includes(query)
            )
          );

    const uniqueById = (items) => {
      const seen = new Set();
      return items.filter((item) => {
        if (seen.has(item._id)) {
          return false;
        }

        seen.add(item._id);
        return true;
      });
    };

    return {
      sale: uniqueById(applySearch(sortByPriceAsc(products))).slice(0, 4),
      newArrivals: uniqueById(applySearch(sortByNewest(products))).slice(0, 4),
      bestSellers: uniqueById(applySearch(sortByFeatured(products))).slice(0, 4),
    };
  }, [products, searchQuery]);

  const renderCollection = (title, subtitle, items, linkLabel, linkTo) => {
    if (!items.length) {
      return null;
    }

    return (
      <section className="category-section">
        <div className="section-heading">
          <div className="section-title">
            <small>{subtitle}</small>
            <h2>{title}</h2>
          </div>
          <Link className="section-link" to={linkTo}>
            {linkLabel}
          </Link>
        </div>
        <div className="section-grid">
          {items.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    );
  };

  const renderSpotlightCollection = ({ title, subtitle, items, linkLabel, linkTo, variant }) => {
    if (!items.length) {
      return null;
    }

    return (
      <section className={`spotlight-collection spotlight-${variant}`}>
        <div className="spotlight-ribbon">
          <span>{title.toUpperCase()}</span>
        </div>
        <div className="spotlight-shell">
          <div className="section-heading spotlight-heading">
            <div className="section-title">
              <small>{subtitle}</small>
              <h2>{title}</h2>
            </div>
            <Link className="section-link" to={linkTo}>
              {linkLabel}
            </Link>
          </div>

          <div className="spotlight-grid">
            {items.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderPromoShowcase = () => (
    <section className="promo-showcase" aria-label="Ưu đãi nổi bật">
      <div className="promo-benefits">
        {PROMO_FEATURES.map((feature) => (
          <article key={feature.title} className="promo-benefit">
            <div className="promo-benefit-icon">
              <PromoFeatureIcon type={feature.icon} />
            </div>
            <div className="promo-benefit-copy">
              <strong>{feature.title}</strong>
              <span>{feature.subtitle}</span>
            </div>
          </article>
        ))}
      </div>

      <section className="promo-slider" aria-label="Bộ sưu tập nổi bật">
        <div className="promo-slider-track">
          {PROMO_SLIDES.map((slide, index) => (
            <article
              key={slide.title}
              className={`promo-slide ${index === promoIndex ? 'is-active' : ''}`}
              aria-hidden={index !== promoIndex}
            >
              <div className="promo-slide-overlay" />
              <div className="promo-slide-copy">
                <span className="promo-slide-badge">{slide.badge}</span>
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
                <Link className="promo-slide-link" to={slide.linkTo}>
                  {slide.linkLabel}
                </Link>
              </div>
              <div className="promo-slide-media">
                <img src={slide.image} alt={slide.title} />
              </div>
            </article>
          ))}
        </div>

        <div className="promo-dots" aria-label="Chọn banner">
          {PROMO_SLIDES.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              className={index === promoIndex ? 'is-active' : ''}
              onClick={() => setPromoIndex(index)}
              aria-label={`Xem banner ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </section>
  );

  return (
    <section className="home-page">
      <section className="hero-slider" aria-label="Banner giới thiệu">
        <div className="hero-slider-track">
          {HERO_SLIDES.map((slide, index) => (
            <article
              key={slide.title}
              className={`hero-slide ${index === slideIndex ? 'is-active' : ''}`}
              aria-hidden={index !== slideIndex}
            >
              <div className="hero-slide-copy">
                <span className="hero-badge">{slide.badge}</span>
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
              </div>
              <div className="hero-slide-media">
                <img src={slide.image} alt={slide.title} />
              </div>
            </article>
          ))}
        </div>

        <div className="hero-dots" aria-label="Chọn slide">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              className={index === slideIndex ? 'is-active' : ''}
              onClick={() => setSlideIndex(index)}
              aria-label={`Xem slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {loading && <p>Đang tải sản phẩm...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="section-group">
          {renderSpotlightCollection({
            title: 'Special Sale !',
            subtitle: 'Ưu đãi đặc biệt',
            items: featuredCollections.sale,
            linkLabel: 'Xem mục sale',
            linkTo: '/category/giay',
            variant: 'sale',
          })}
          {renderPromoShowcase()}
          {renderSpotlightCollection({
            title: 'Hàng mới về',
            subtitle: 'New arrivals',
            items: featuredCollections.newArrivals,
            linkLabel: 'Xem hàng mới',
            linkTo: '/category/ao',
            variant: 'new',
          })}
          {renderCollection('Bán chạy', 'Best sellers', featuredCollections.bestSellers, 'Xem hàng bán chạy', '/category/phu-kien')}
        </div>
      )}

      {!loading && !error &&
        CATEGORY_ORDER.map((category) => {
          const allCategoryProducts = groupedProducts[category] || [];
          const featuredProducts = allCategoryProducts.filter((product) => product.featured);
          
          // Combine featured products with non-featured to ensure at least 4
          const displayProducts = [
            ...featuredProducts.slice(0, 4),
            ...allCategoryProducts
              .filter((product) => !product.featured)
              .slice(0, Math.max(0, 4 - featuredProducts.length))
          ];

          if (!displayProducts.length) {
            return null;
          }

          return (
            <section key={category} className="category-section">
              <div className="section-heading">
                <div className="section-title">
                  <small>{category}</small>
                  <h2>{CATEGORY_TITLES[category] || category}</h2>
                </div>
                <Link className="section-link" to={`/category/${normalizeText(category).replace(/\s+/g, '-')}`}>
                  Xem tất cả
                </Link>
              </div>
              <div className="section-grid">
                {displayProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </section>
          );
        })}
    </section>
  );
};

export default HomePage;
