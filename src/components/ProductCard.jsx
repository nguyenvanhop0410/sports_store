import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const productPath = `/product/${product._id}`;

  const handleOpenDetail = () => {
    navigate(productPath);
  };

  return (
    <article
      className="card product-card-clickable"
      role="link"
      tabIndex={0}
      onClick={handleOpenDetail}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleOpenDetail();
        }
      }}
    >
      <img className="product-image" src={product.image} alt={product.name} />
      <div className="card-body">
        <small>{product.brand}</small>
        <h3>{product.name}</h3>
        <div className="badge">{product.category}</div>
        <div className="price">{formatCurrency(product.price)}</div>
        <small>{product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Tạm hết hàng'}</small>
        <div className="actions" style={{ marginTop: 10 }}>
          <Link
            className="btn btn-secondary"
            to={productPath}
            onClick={(event) => event.stopPropagation()}
          >
            Xem chi tiết
          </Link>
          <button
            className="btn btn-primary"
            onClick={(event) => {
              event.stopPropagation();
              addToCart(product, 1);
            }}
            disabled={product.stock <= 0}
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
