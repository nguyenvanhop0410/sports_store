import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../utils/api';
import { formatCurrency } from '../utils/currency';

const AdminOrdersPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const loadData = async () => {
    const [ordersData, summaryData] = await Promise.all([
      apiRequest('/orders', {}, token),
      apiRequest('/orders/summary', {}, token),
    ]);

    setOrders(ordersData || []);
    setStats(summaryData.stats || null);
  };

  useEffect(() => {
    loadData().catch((err) => setError(err.message));
  }, []);

  const updateStatus = async (id, key, value) => {
    try {
      await apiRequest(`/orders/${id}/status`, { method: 'PATCH', body: { [key]: value } }, token);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="panel">
      <h1>Quản lý đơn hàng</h1>
      {error && <p className="error">{error}</p>}

      {stats && (
        <div className="actions" style={{ margin: '14px 0' }}>
          <div className="badge">Tổng đơn: {stats.totalOrders}</div>
          <div className="badge">Tổng sản phẩm: {stats.totalProducts}</div>
          <div className="badge">Doanh thu: {formatCurrency(stats.totalRevenue)}</div>
        </div>
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái đơn</th>
              <th>Trạng thái TT</th>
              <th>Cập nhật</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(-8).toUpperCase()}</td>
                <td>
                  <strong>{order.customerInfo?.name || order.user?.name}</strong>
                  <br />
                  <small>{order.customerInfo?.email || order.user?.email}</small>
                </td>
                <td>{formatCurrency(order.totalAmount)}</td>
                <td>
                  <span className="status">{order.orderStatus}</span>
                </td>
                <td>
                  <span className="status">{order.paymentStatus}</span>
                </td>
                <td>
                  <div className="actions">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateStatus(order._id, 'orderStatus', e.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="confirmed">confirmed</option>
                      <option value="shipping">shipping</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                    <select
                      value={order.paymentStatus}
                      onChange={(e) => updateStatus(order._id, 'paymentStatus', e.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="paid">paid</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminOrdersPage;
