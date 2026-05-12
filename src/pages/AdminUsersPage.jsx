import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../utils/api';

const roleOptions = [
  { value: 'user', label: 'Người dùng' },
  { value: 'admin', label: 'Quản trị' },
];

const AdminUsersPage = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    const data = await apiRequest('/auth/users', {}, token);
    setUsers(data || []);
  };

  useEffect(() => {
    loadUsers().catch((err) => setError(err.message));
  }, []);

  const handleRoleChange = async (userId, nextRole) => {
    try {
      setError('');
      await apiRequest(`/auth/users/${userId}/role`, { method: 'PATCH', body: { role: nextRole } }, token);
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="panel">
      <h1>Quản lý người dùng</h1>
      <p className="muted-copy">Phân quyền tài khoản để giới hạn các thao tác quản trị.</p>
      {error && <p className="error">{error}</p>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Ngày tạo</th>
              <th>Đổi quyền</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="status">{user.role}</span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                <td>
                  <div className="actions">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    >
                      {roleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
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

export default AdminUsersPage;