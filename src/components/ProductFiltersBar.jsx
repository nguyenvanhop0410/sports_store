const ProductFiltersBar = ({
  title,
  sort,
  onSortChange,
  price,
  onPriceChange,
  productType,
  onProductTypeChange,
  brand,
  onBrandChange,
  sizeShoes,
  onSizeShoesChange,
  sizeClothes,
  onSizeClothesChange,
  categories,
  brands,
  shoeSizes,
  clothingSizes,
}) => {
  return (
    <section className="catalog-toolbar">
      <div className="catalog-toolbar-top">
        <h1>{title}</h1>
        <div className="catalog-sort">
          <span>Sắp xếp:</span>
          <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name-asc">Tên A-Z</option>
          </select>
        </div>
      </div>

      <div className="catalog-filter-strip">
        <div className="catalog-filter-block">
          <label>Chọn mức giá</label>
          <select value={price} onChange={(e) => onPriceChange(e.target.value)}>
            <option value="all">Tất cả</option>
            <option value="under300">Dưới 300.000đ</option>
            <option value="300to700">300.000đ - 700.000đ</option>
            <option value="700to1500">700.000đ - 1.500.000đ</option>
            <option value="above1500">Trên 1.500.000đ</option>
          </select>
        </div>

        <div className="catalog-filter-block">
          <label>Loại sản phẩm</label>
          <select value={productType} onChange={(e) => onProductTypeChange(e.target.value)}>
            <option value="all">Tất cả</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="catalog-filter-block">
          <label>Thương hiệu</label>
          <select value={brand} onChange={(e) => onBrandChange(e.target.value)}>
            <option value="all">Tất cả</option>
            {brands.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="catalog-filter-block">
          <label>Size giày</label>
          <select value={sizeShoes} onChange={(e) => onSizeShoesChange(e.target.value)}>
            <option value="all">Tất cả</option>
            {shoeSizes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="catalog-filter-block">
          <label>Size quần áo</label>
          <select value={sizeClothes} onChange={(e) => onSizeClothesChange(e.target.value)}>
            <option value="all">Tất cả</option>
            {clothingSizes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default ProductFiltersBar;
