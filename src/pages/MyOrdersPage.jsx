import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../utils/api';
import { formatCurrency } from '../utils/currency';

const MyOrdersPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const paymentLabels = {
    COD: 'COD',
    BANK_TRANSFER: 'Chuyển khoản mô phỏng',
  };

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await apiRequest('/orders/my-orders', {}, token);
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadOrders();
  }, [token]);

  return (
    <section className="panel">
      <h1>Đơn hàng của tôi</h1>
      {error && <p className="error">{error}</p>}
      {!orders.length && !error && <div className="empty">Bạn chưa có đơn hàng nào.</div>}
      {!!orders.length && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Ngày</th>
                <th>Phương thức</th>
                <th>Tổng tiền</th>
                <th>Trạng thái đơn</th>
                <th>Thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(-8).toUpperCase()}</td>
                  <td>{new Date(order.createdAt).toLocaleString('vi-VN')}</td>
                  <td>{paymentLabels[order.paymentMethod] || order.paymentMethod}</td>
                  <td>{formatCurrency(order.totalAmount)}</td>
                  <td>
                    <span className="status">{order.orderStatus}</span>
                  </td>
                  <td>
                    <span className="status">{order.paymentStatus}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyOrdersPage;
