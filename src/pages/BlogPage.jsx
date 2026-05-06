const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Cách chọn áo thể thao phù hợp với vóc dáng',
      excerpt: 'Hướng dẫn chi tiết để lựa chọn áo thể thao thoải mái và phù hợp với vóc dáng cơ thể của bạn.',
      date: '15/05/2024',
      category: 'Mẹo mua hàng',
    },
    {
      id: 2,
      title: 'Những loại giày tập luyện tốt nhất năm 2024',
      excerpt: 'Top 10 giày tập luyện được các vận động viên chuyên nghiệp sử dụng và yêu thích nhất.',
      date: '12/05/2024',
      category: 'Đánh giá sản phẩm',
    },
    {
      id: 3,
      title: 'Bí quyết bảo quản đồ thể thao lâu dài',
      excerpt: 'Những cách bảo quản đơn giản giúp tăng tuổi thọ của quần áo và giày thể thao.',
      date: '08/05/2024',
      category: 'Mẹo chăm sóc',
    },
    {
      id: 4,
      title: 'Phụ kiện thể thao không thể thiếu trong phòng tập',
      excerpt: 'Danh sách những phụ kiện thiết yếu giúp nâng cao hiệu suất tập luyện của bạn.',
      date: '01/05/2024',
      category: 'Hướng dẫn',
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Blog Thể Thao</h1>
        <p>Khám phá những thông tin hữu ích về thể thao và tập luyện</p>
      </div>

      <div className="page-content">
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-category-badge">{post.category}</div>
              <h3>{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-footer">
                <span className="blog-date">{post.date}</span>
                <a href="#/" className="blog-link">Đọc tiếp →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
