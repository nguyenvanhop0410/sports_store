import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../utils/api';
import { formatCurrency } from '../utils/currency';

const initialForm = {
  name: '',
  category: '',
  brand: '',
  price: '',
  description: '',
  image: '',
  stock: '',
  featured: false,
  sizes: {
    shoes: [],
    clothes: [],
  },
  colors: '',
};

const AdminProductsPage = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState('');
  const [error, setError] = useState('');

  const title = useMemo(() => (editingId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'), [editingId]);

  const loadProducts = async () => {
    const data = await apiRequest('/products');
    setProducts(data.products || []);
  };

  useEffect(() => {
    loadProducts().catch((err) => setError(err.message));
  }, []);

  const clearForm = () => {
    setEditingId('');
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      featured: Boolean(form.featured),
      sizes: {
        shoes: form.sizes?.shoes || [],
        clothes: form.sizes?.clothes || [],
      },
      colors: form.colors,
    };

    try {
      if (editingId) {
        await apiRequest(`/products/${editingId}`, { method: 'PUT', body: payload }, token);
      } else {
        await apiRequest('/products', { method: 'POST', body: payload }, token);
      }

      clearForm();
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      description: product.description,
      image: product.image,
      stock: product.stock,
      featured: product.featured,
      sizes: product.sizes || { shoes: [], clothes: [] },
      colors: Array.isArray(product.colors) ? product.colors.join(', ') : '',
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Bạn có chắc muốn xóa sản phẩm này?');
    if (!confirmed) return;

    try {
      await apiRequest(`/products/${id}`, { method: 'DELETE' }, token);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="two-col">
      <form className="panel form-grid" onSubmit={handleSubmit}>
        <h1>{title}</h1>
        <input
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
        <input
          placeholder="Loại"
          value={form.category}
          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
          required
        />
        <input
          placeholder="Thương hiệu"
          value={form.brand}
          onChange={(e) => setForm((prev) => ({ ...prev, brand: e.target.value }))}
        />
        <input
          type="number"
          min="0"
          placeholder="Giá"
          value={form.price}
          onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
          required
        />
        <input
          type="number"
          min="0"
          placeholder="Tồn kho"
          value={form.stock}
          onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))}
          required
        />
        <input
          placeholder="Link hình"
          value={form.image}
          onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
          required
        />
        <textarea
          rows="3"
          placeholder="Mô tả"
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          required
        />
        <input
          placeholder="Màu sắc (ngăn cách bằng dấu phẩy)"
          value={form.colors}
          onChange={(e) => setForm((prev) => ({ ...prev, colors: e.target.value }))}
        />
        <label>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
          />{' '}
          Sản phẩm nổi bật
        </label>

        <div className="sizes-section">
          <label>Size giày (chọn nhiều)</label>
          <div className="sizes-checkboxes">
            {['38', '39', '40', '41', '42', '43', '44'].map((size) => (
              <label key={size}>
                <input
                  type="checkbox"
                  checked={form.sizes?.shoes?.includes(size) || false}
                  onChange={(e) => {
                    const shoes = e.target.checked
                      ? [...(form.sizes?.shoes || []), size]
                      : (form.sizes?.shoes || []).filter((s) => s !== size);
                    setForm((prev) => ({
                      ...prev,
                      sizes: { ...prev.sizes, shoes },
                    }));
                  }}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        <div className="sizes-section">
          <label>Size quần áo (chọn nhiều)</label>
          <div className="sizes-checkboxes">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <label key={size}>
                <input
                  type="checkbox"
                  checked={form.sizes?.clothes?.includes(size) || false}
                  onChange={(e) => {
                    const clothes = e.target.checked
                      ? [...(form.sizes?.clothes || []), size]
                      : (form.sizes?.clothes || []).filter((s) => s !== size);
                    setForm((prev) => ({
                      ...prev,
                      sizes: { ...prev.sizes, clothes },
                    }));
                  }}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="actions">
          <button className="btn btn-primary">{editingId ? 'Lưu thay đổi' : 'Tạo sản phẩm'}</button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={clearForm}>
              Hủy
            </button>
          )}
        </div>
      </form>

      <div className="panel">
        <h2>Danh sách sản phẩm</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Giá</th>
                <th>Tồn</th>
                <th>Loại</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{formatCurrency(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-secondary" onClick={() => handleEdit(product)}>
                        Sửa
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminProductsPage;
