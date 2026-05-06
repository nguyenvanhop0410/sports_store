import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductFiltersBar from '../components/ProductFiltersBar';
import { apiRequest } from '../utils/api';

const CATEGORY_MAP = {
  ao: 'Áo',
  quan: 'Quần',
  giay: 'Giày',
  'phu-kien': 'Phụ kiện',
  'phu-kien-': 'Phụ kiện',
  'dung-cu': 'Dụng cụ',
};

const CATEGORY_TITLES = {
  'Áo': 'Áo thể thao',
  'Quần': 'Quần thể thao',
  'Giày': 'Giày thể thao',
  'Phụ kiện': 'Phụ kiện thể thao',
  'Dụng cụ': 'Dụng cụ thể thao',
};

const CATEGORY_LABELS = {
  'Áo': 'Trang phục thể thao',
  'Quần': 'Quần tập và quần thể thao',
  'Giày': 'Giày thể thao và giày chuyên dụng',
  'Phụ kiện': 'Phụ kiện hỗ trợ tập luyện',
  'Dụng cụ': 'Dụng cụ và thiết bị tập luyện',
};

const CATEGORY_BRANDS = {
  'Áo': ['ActivePro', 'RunElite', 'FlexCore', 'SwimPro', 'LayerPro'],
  'Quần': ['ActivePro', 'YogaFit', 'GolfFlex', 'DenimActive'],
  'Giày': ['RunTech', 'KickPro', 'CourtMax', 'RacketOne', 'SportPro', 'KickPower'],
  'Phụ kiện': ['TrailMax', 'SportWear', 'ComfortSocks', 'StrengthSupport', 'HydraGo', 'RunGear', 'GymGear', 'FitTech'],
  'Dụng cụ': ['ResistanceBand', 'JumpKing', 'StrengthMax', 'YogaEssence', 'HomeGym', 'KickOne'],
};

const SHOES_SIZES = ['38', '39', '40', '41', '42', '43', '44'];
const CLOTHING_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const priceRanges = {
  all: () => true,
  under300: (price) => price < 300000,
  '300to700': (price) => price >= 300000 && price <= 700000,
  '700to1500': (price) => price > 700000 && price <= 1500000,
  above1500: (price) => price > 1500000,
};

const slugToCategory = (slug) => CATEGORY_MAP[slug] || 'Giày';

const normalizeText = (value) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const categoryName = slugToCategory(categorySlug);
  const title = CATEGORY_TITLES[categoryName] || `${categoryName} thể thao`;

  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('default');
  const [price, setPrice] = useState('all');
  const [productType, setProductType] = useState(categoryName);
  const [brand, setBrand] = useState('all');
  const [sizeShoes, setSizeShoes] = useState('all');
  const [sizeClothes, setSizeClothes] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setProductType(categoryName);
  }, [categoryName]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams();
        if (categoryName) params.append('category', categoryName);
        
        const data = await apiRequest(`/products?${params.toString()}`);
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categorySlug, categoryName]);

  const filteredProducts = useMemo(() => {
    const byPrice = priceRanges[price] || priceRanges.all;
    const normalizedCategory = normalizeText(productType === 'all' ? categoryName : productType);
    const normalizedTargetCategory = normalizeText(categoryName);

    let nextProducts = [...products].filter((product) => {
      const matchesCurrentPage = normalizeText(product.category) === normalizedTargetCategory;
      const matchesSelectedType = productType === 'all' || normalizeText(product.category) === normalizedCategory;
      const matchesSearch =
        !search ||
        [product.name, product.description, product.brand].some((field) =>
          normalizeText(field).includes(normalizeText(search))
        );

      return byPrice(product.price) && matchesCurrentPage && matchesSelectedType && matchesSearch;
    });

    if (brand !== 'all') {
      nextProducts = nextProducts.filter((product) => product.brand === brand);
    }

    if (categoryName === 'Giày' && sizeShoes !== 'all') {
      nextProducts = nextProducts.filter((product) => product.sizes?.shoes?.includes(sizeShoes));
    }

    if (['Áo', 'Quần'].includes(categoryName) && sizeClothes !== 'all') {
      nextProducts = nextProducts.filter((product) => product.sizes?.clothes?.includes(sizeClothes));
    }

    if (sort === 'price-asc') {
      nextProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      nextProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'name-asc') {
      nextProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      nextProducts.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.createdAt.localeCompare(a.createdAt));
    }

    return nextProducts;
  }, [products, price, brand, sizeShoes, sizeClothes, sort, categoryName, productType, search]);

  const brands = CATEGORY_BRANDS[categoryName] || [];

  return (
    <section>
      <div className="category-page-top">
        <div>
          <small>{title.toUpperCase()}</small>
          <h1>{categoryName}</h1>
        </div>
        <Link className="section-link" to="/">Về trang chủ</Link>
      </div>

      <ProductFiltersBar
        title={title}
        sort={sort}
        onSortChange={setSort}
        price={price}
        onPriceChange={setPrice}
        productType={productType}
        onProductTypeChange={setProductType}
        brand={brand}
        onBrandChange={setBrand}
        sizeShoes={sizeShoes}
        onSizeShoesChange={setSizeShoes}
        sizeClothes={sizeClothes}
        onSizeClothesChange={setSizeClothes}
        categories={['Áo', 'Quần', 'Giày', 'Phụ kiện', 'Dụng cụ']}
        brands={brands}
        shoeSizes={SHOES_SIZES}
        clothingSizes={CLOTHING_SIZES}
      />

      <div className="filters search-strip">
        <div className="filter-row">
          <input
            placeholder="Từ khóa tên, mô tả, thương hiệu"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            value={categoryName}
            disabled
            aria-label="Danh mục hiện tại"
          />
        </div>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p>Đang tải sản phẩm...</p>}
      {!loading && !filteredProducts.length && <div className="empty">Không tìm thấy sản phẩm phù hợp.</div>}

      <div className="section-group">
        <section className="category-section">
          <div className="section-heading">
            <div className="section-title">
              <small>{categoryName}</small>
              <h2>{CATEGORY_LABELS[categoryName] || 'Sản phẩm nổi bật'}</h2>
            </div>
          </div>
          <div className="section-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default CategoryPage;
