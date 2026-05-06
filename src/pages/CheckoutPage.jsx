import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { apiRequest } from '../utils/api';
import { formatCurrency } from '../utils/currency';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { items, totalAmount, totalQuantity, clearCart } = useCart();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'COD',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!items.length) {
      setError('Giỏ hàng đang trống');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size || '',
          color: item.color || '',
        })),
        customerInfo: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          note: form.note,
        },
        paymentMethod: form.paymentMethod,
      };

      await apiRequest('/orders', { method: 'POST', body: payload }, token);
      clearCart();
      setSuccess('Đặt hàng thành công. Bạn có thể theo dõi trong mục Đơn hàng của tôi.');
      setTimeout(() => navigate('/my-orders'), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="two-col">
      <form className="panel form-grid" onSubmit={handleSubmit}>
        <h1>Thông tin đặt hàng</h1>
        <input
          placeholder="Họ tên"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <input
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
          required
        />
        <textarea
          rows="3"
          placeholder="Địa chỉ giao hàng"
          value={form.address}
          onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
          required
        />
        <textarea
          rows="2"
          placeholder="Ghi chú (không bắt buộc)"
          value={form.note}
          onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
        />

        <select
          value={form.paymentMethod}
          onChange={(e) => setForm((prev) => ({ ...prev, paymentMethod: e.target.value }))}
        >
          <option value="COD">Thanh toán khi nhận hàng (COD)</option>
          <option value="BANK_TRANSFER">Chuyển khoản mô phỏng</option>
        </select>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
        </button>
      </form>

      <aside className="panel">
        <h2>Tổng quan đơn hàng</h2>
        <p>
          <strong>Số mặt hàng:</strong> {items.length}
        </p>
        <p>
          <strong>Tổng số lượng:</strong> {totalQuantity}
        </p>
        <p>
          <strong>Tổng thành tiền:</strong> {formatCurrency(totalAmount)}
        </p>
        <small>
          Thanh toán chuyển khoản là mô phỏng, hệ thống sẽ tạo đơn hàng với trạng thái thanh toán pending.
        </small>
      </aside>
    </section>
  );
};

export default CheckoutPage;
