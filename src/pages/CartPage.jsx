import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

const CartPage = () => {
  const { items, totalQuantity, totalAmount, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  return (
    <section className="two-col">
      <div className="panel">
        <h1>Giỏ hàng</h1>
        {!items.length && (
          <div className="empty">
            Giỏ hàng trống. <Link to="/">Quay lại mua hàng</Link>
          </div>
        )}
        {!!items.length && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tạm tính</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.cartItemId || item.productId}>
                    <td>
                      <strong>{item.name}</strong>
                      {!!item.size && <small>Size: {item.size}</small>}
                      {!!item.color && <small>Màu: {item.color}</small>}
                    </td>
                    <td>{formatCurrency(item.price)}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max={item.stock}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.cartItemId || item.productId, Number(e.target.value))}
                        className="inline-input"
                        style={{ width: 80 }}
                      />
                    </td>
                    <td>{formatCurrency(item.price * item.quantity)}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => removeItem(item.cartItemId || item.productId)}>
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <aside className="panel">
        <h2>Tổng kết</h2>
        <p>
          <strong>Tổng số lượng:</strong> {totalQuantity}
        </p>
        <p>
          <strong>Tổng giá:</strong> {formatCurrency(totalAmount)}
        </p>
        <div className="actions">
          <button className="btn btn-primary" disabled={!items.length} onClick={() => navigate('/checkout')}>
            Đặt hàng
          </button>
        </div>
      </aside>
    </section>
  );
};

export default CartPage;
