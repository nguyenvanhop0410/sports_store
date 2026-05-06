import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { apiRequest } from '../utils/api';
import { formatCurrency } from '../utils/currency';

const SERVICE_POINTS = [
  {
    title: 'Giao hàng toàn quốc',
    description: 'Đóng gói cẩn thận, hỗ trợ theo dõi đơn hàng trong suốt quá trình vận chuyển.',
  },
  {
    title: 'Đổi trả linh hoạt',
    description: 'Hỗ trợ đổi size nhanh trong 5 ngày nếu sản phẩm còn nguyên tem mác.',
  },
  {
    title: 'Cam kết chính hãng',
    description: 'Nguồn hàng rõ ràng, kiểm tra kỹ trước khi bàn giao cho đơn vị vận chuyển.',
  },
  {
    title: 'Tư vấn chọn đồ',
    description: 'Đội ngũ hỗ trợ gợi ý size và sản phẩm phù hợp với mục đích sử dụng.',
  },
];

const CLOTHING_SIZE_GUIDE = [
  { size: 'S', chest: '86 - 90 cm', waist: '70 - 74 cm', height: '160 - 168 cm' },
  { size: 'M', chest: '91 - 96 cm', waist: '75 - 80 cm', height: '168 - 173 cm' },
  { size: 'L', chest: '97 - 102 cm', waist: '81 - 86 cm', height: '173 - 178 cm' },
  { size: 'XL', chest: '103 - 108 cm', waist: '87 - 92 cm', height: '178 - 183 cm' },
  { size: 'XXL', chest: '109 - 114 cm', waist: '93 - 98 cm', height: '183 - 188 cm' },
];

const SHOE_SIZE_GUIDE = [
  { size: '38', footLength: '23.5 - 24 cm', fit: 'Form gọn' },
  { size: '39', footLength: '24 - 24.5 cm', fit: 'Form gọn' },
  { size: '40', footLength: '24.5 - 25 cm', fit: 'Chuẩn' },
  { size: '41', footLength: '25 - 25.5 cm', fit: 'Chuẩn' },
  { size: '42', footLength: '25.5 - 26 cm', fit: 'Thoải mái' },
  { size: '43', footLength: '26 - 26.5 cm', fit: 'Thoải mái' },
  { size: '44', footLength: '26.5 - 27 cm', fit: 'Bàn chân bè' },
];

const ACCESSORY_GUIDE = [
  { label: 'Phân loại', value: 'Phụ kiện hoặc dụng cụ thể thao' },
  { label: 'Tính chất', value: 'Thiết kế gọn, dễ phối hợp với nhiều bài tập' },
  { label: 'Bảo quản', value: 'Lau sạch sau khi dùng, tránh môi trường ẩm lâu' },
  { label: 'Tư vấn thêm', value: 'Liên hệ shop nếu bạn cần so sánh kích thước thực tế' },
];

const COLOR_FALLBACKS = {
  'Giày': ['Đen', 'Trắng', 'Đỏ'],
  'Áo': ['Đen', 'Trắng', 'Xanh Navy'],
  'Quần': ['Đen', 'Xám', 'Xanh Olive'],
  'Phụ kiện': ['Đen', 'Xanh Navy', 'Trắng'],
  'Dụng cụ': ['Đen', 'Xám'],
};

const CATEGORY_SLUGS = {
  'Áo': 'ao',
  'Quần': 'quan',
  'Giày': 'giay',
  'Phụ kiện': 'phu-kien',
  'Dụng cụ': 'dung-cu',
};

const getSizeOptions = (product) => {
  const shoeSizes = product?.sizes?.shoes || [];
  const clothingSizes = product?.sizes?.clothes || [];

  if (shoeSizes.length) {
    return { label: 'Kích thước giày', values: shoeSizes, type: 'shoes' };
  }

  if (clothingSizes.length) {
    return { label: 'Kích thước', values: clothingSizes, type: 'clothes' };
  }

  return { label: 'Kích thước', values: [], type: 'general' };
};

const getColorOptions = (product) => {
  const colors = Array.isArray(product?.colors) && product.colors.length ? product.colors : COLOR_FALLBACKS[product?.category] || [];

  return { label: 'Màu sắc', values: colors };
};

const getSizeGuide = (product) => {
  const sizeOptions = getSizeOptions(product);

  if (sizeOptions.type === 'shoes') {
    return {
      title: 'Bảng size giày tham khảo',
      columns: ['Size', 'Chiều dài chân', 'Gợi ý form'],
      rows: SHOE_SIZE_GUIDE.filter((item) => sizeOptions.values.includes(item.size)).map((item) => [
        item.size,
        item.footLength,
        item.fit,
      ]),
      hint: 'Nếu bạn có bàn chân bè hoặc thường mang tất dày, nên cân nhắc tăng nửa size so với size quen thuộc.',
    };
  }

  if (sizeOptions.type === 'clothes') {
    return {
      title: 'Bảng size quần áo tham khảo',
      columns: ['Size', 'Ngực', 'Eo', 'Chiều cao'],
      rows: CLOTHING_SIZE_GUIDE.filter((item) => sizeOptions.values.includes(item.size)).map((item) => [
        item.size,
        item.chest,
        item.waist,
        item.height,
      ]),
      hint: 'Form thực tế có thể chênh nhẹ tùy chất liệu. Nếu thích mặc rộng, bạn có thể chọn tăng 1 size.',
    };
  }

  return {
    title: 'Thông tin lựa chọn sản phẩm',
    columns: ['Nội dung', 'Chi tiết'],
    rows: ACCESSORY_GUIDE.map((item) => [item.label, item.value]),
    hint: 'Nhóm sản phẩm này không chia size cố định, nhưng shop vẫn hỗ trợ tư vấn trước khi đặt mua.',
  };
};

const getProductNarrative = (product) => {
  const categoryCopy = {
    'Áo': 'Thiết kế ưu tiên sự thoáng khí, linh hoạt và cảm giác mặc dễ chịu trong các buổi tập cường độ vừa đến cao.',
    'Quần': 'Form quần gọn gàng, hỗ trợ chuyển động tốt và giữ cảm giác thoải mái trong suốt buổi tập.',
    'Giày': 'Cấu trúc đế và thân giày hướng đến sự ổn định, bám sân và hỗ trợ chuyển động liên tục.',
    'Phụ kiện': 'Thiết kế thực dụng, dễ mang theo và bổ trợ hiệu quả cho trải nghiệm tập luyện hằng ngày.',
    'Dụng cụ': 'Tập trung vào độ bền, cảm giác cầm nắm ổn định và khả năng sử dụng linh hoạt cho nhiều bài tập.',
  };

  return {
    intro: `${product.name} là lựa chọn nổi bật từ ${product.brand || 'Sports Zone'}, phù hợp cho người dùng đang tìm một sản phẩm ${product.category.toLowerCase()} có tính ứng dụng cao.`,
    detail: product.description,
    extra: categoryCopy[product.category] || 'Sản phẩm được chọn theo tiêu chí dễ dùng, bền và phù hợp với nhiều nhu cầu thể thao khác nhau.',
    highlights: [
      `Thiết kế theo định hướng ${product.category.toLowerCase()} chuyên dụng nhưng vẫn dễ dùng hằng ngày.`,
      `Mức giá ${formatCurrency(product.price)} phù hợp cho cả người mới bắt đầu lẫn người tập luyện thường xuyên.`,
      product.stock > 0
        ? `Kho hiện còn ${product.stock} sản phẩm, sẵn sàng giao nhanh toàn quốc.`
        : 'Sản phẩm đang tạm hết hàng, bạn có thể theo dõi để chờ đợt nhập tiếp theo.',
    ],
  };
};

const clampQuantity = (value, stock) => {
  const nextValue = Number(value) || 1;
  return Math.max(1, Math.min(nextValue, Math.max(stock, 1)));
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError('');
      setProduct(null);
      setRelatedProducts([]);

      try {
        const productData = await apiRequest(`/products/${id}`);
        const sizeOptions = getSizeOptions(productData);
        const colorOptions = getColorOptions(productData);

        setProduct(productData);
        setQuantity(1);
        setSelectedSize(sizeOptions.values[0] || '');
        setSelectedColor(colorOptions.values[0] || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        try {
          const relatedData = await apiRequest(
            `/products?category=${encodeURIComponent(productData.category)}`
          );
          const nextRelatedProducts = (relatedData.products || [])
            .filter((item) => item._id !== productData._id)
            .slice(0, 4);

          setRelatedProducts(nextRelatedProducts);
        } catch {
          setRelatedProducts([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <p>Đang tải chi tiết sản phẩm...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!product) {
    return <div className="empty">Không tìm thấy sản phẩm.</div>;
  }

  const sizeOptions = getSizeOptions(product);
  const colorOptions = getColorOptions(product);
  const sizeGuide = getSizeGuide(product);
  const productNarrative = getProductNarrative(product);
  const categorySlug = CATEGORY_SLUGS[product.category] || '';
  const stockLabel = product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Tạm hết hàng';

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <section className="product-detail-page">
      <div className="product-breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        {categorySlug ? (
          <Link to={`/category/${categorySlug}`}>{product.category}</Link>
        ) : (
          <span>{product.category}</span>
        )}
        <span>/</span>
        <strong>{product.name}</strong>
      </div>

      <div className="product-detail-stage">
        <div className="panel product-overview-shell">
          <div className="product-overview-grid">
            <div className="product-gallery-panel">
              <div className="product-gallery-top">
                <div>
                  <small className="product-section-kicker">SẢN PHẨM NỔI BẬT</small>
                  <p className="product-gallery-caption">
                    Thiết kế theo phong cách thể thao hiện đại, phù hợp cho nhu cầu luyện tập và mặc hằng ngày.
                  </p>
                </div>
                <span className="badge">{product.category}</span>
              </div>

              <div className="product-gallery-stage">
                <img className="product-detail-image" src={product.image} alt={product.name} />
              </div>

              <div className="product-gallery-note">
                <strong>{product.brand}</strong>
                <p>{product.description}</p>
              </div>
            </div>

            <section className="product-summary-panel">
              <div className="product-summary-header">
                <small className="product-section-kicker">THƯƠNG HIỆU</small>
                <p className="product-summary-brand">{product.brand}</p>
                <h1>{product.name}</h1>
                <p className="product-summary-text">{product.description}</p>
              </div>

              <div className="product-price-row">
                <strong className="product-detail-price">{formatCurrency(product.price)}</strong>
                <span className={`product-stock-pill ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {stockLabel}
                </span>
              </div>

              <div className="product-meta-grid">
                <div className="product-meta-card">
                  <span>Danh mục</span>
                  <strong>{product.category}</strong>
                </div>
                <div className="product-meta-card">
                  <span>Tình trạng</span>
                  <strong>{product.stock > 0 ? 'Sẵn hàng' : 'Hết hàng'}</strong>
                </div>
              </div>

              {!!sizeOptions.values.length && (
                <div className="product-size-block">
                  <div className="product-size-header">
                    <strong>{sizeOptions.label}</strong>
                    <span>Chọn đúng size để mặc vừa và thoải mái hơn.</span>
                  </div>
                  <div className="size-chip-list">
                    {sizeOptions.values.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`size-chip ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!!colorOptions.values.length && (
                <div className="product-color-block">
                  <div className="product-size-header">
                    <strong>{colorOptions.label}</strong>
                    <span>Chọn màu phù hợp trước khi thêm vào giỏ hàng.</span>
                  </div>
                  <div className="color-chip-list">
                    {colorOptions.values.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`color-chip ${selectedColor === color ? 'active' : ''}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        <span className="color-chip-swatch" data-color={color} />
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="product-purchase-row">
                <div className="quantity-stepper" aria-label="Chọn số lượng">
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => clampQuantity(current - 1, product.stock))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={Math.max(product.stock, 1)}
                    value={quantity}
                    onChange={(event) => setQuantity(clampQuantity(event.target.value, product.stock))}
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => clampQuantity(current + 1, product.stock))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>

                <button className="btn btn-primary product-buy-button" disabled={product.stock <= 0} onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </button>

                <Link className="btn btn-secondary product-cart-link" to="/cart">
                  Xem giỏ hàng
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="product-detail-content">
        <section className="panel product-detail-copy">
          <div className="detail-heading">
            <small className="product-section-kicker">MÔ TẢ CHI TIẾT</small>
            <h2>Thông tin sản phẩm</h2>
          </div>

          <div className="detail-copy-body">
            <p>{productNarrative.intro}</p>
            <p>{productNarrative.detail}</p>
            <p>{productNarrative.extra}</p>
          </div>

          <div className="detail-highlight-grid">
            {productNarrative.highlights.map((item) => (
              <div key={item} className="detail-highlight-card">
                {item}
              </div>
            ))}
          </div>

          <div className="product-service-band">
            {SERVICE_POINTS.map((item) => (
              <article key={item.title} className="product-service-card">
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="panel product-size-guide-panel">
          <div className="detail-heading">
            <small className="product-section-kicker">BẢNG SIZE</small>
            <h2>{sizeGuide.title}</h2>
          </div>

          <div className="table-wrap product-size-table">
            <table>
              <thead>
                <tr>
                  {sizeGuide.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeGuide.rows.map((row) => (
                  <tr key={row.join('-')}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="product-size-hint">{sizeGuide.hint}</p>
        </aside>
      </div>

      <section className="category-section related-products-section">
        <div className="section-heading">
          <div className="section-title">
            <small>{product.category}</small>
            <h2>Sản phẩm liên quan</h2>
          </div>
          {categorySlug && (
            <Link className="section-link" to={`/category/${categorySlug}`}>
              Xem tất cả
            </Link>
          )}
        </div>

        {!relatedProducts.length && (
          <div className="empty">Hiện chưa có thêm sản phẩm liên quan trong danh mục này.</div>
        )}

        {!!relatedProducts.length && (
          <div className="section-grid">
            {relatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default ProductDetailPage;
