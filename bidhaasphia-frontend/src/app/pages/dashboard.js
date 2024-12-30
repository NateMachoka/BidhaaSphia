import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBoxOpen, faSearch } from '@fortawesome/free-solid-svg-icons';

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search
  const [loading, setLoading] = useState(true);

  // Fetch products and categories from backend
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setCategories([
          { name: 'clothing', icon: faTshirt },
          { name: 'electronics', icon: faLaptop },
          { name: 'mobiles', icon: faMobileAlt },
          { name: 'books', icon: faBook },
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  // Filter products based on category and search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (productId) => {
    alert(`Product with ID ${productId} added to cart.`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Top Line */}
      <div className="top-line">
        <div className="user-profile">Hi, User</div>
        <div className="icons">
          <FontAwesomeIcon icon={faBoxOpen} title="Orders" className="icon" />
          <FontAwesomeIcon icon={faShoppingCart} title="Cart" className="icon" />
          <img src="/kenya-flag.png" alt="Kenyan flag" className="flag" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`category-button ${selectedCategory === category.name ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={category.icon} /> {category.name}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="products">
        {selectedCategory && <h2>Products in {selectedCategory}</h2>}
        <div className="products-list">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-item">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <button onClick={() => handleAddToCart(product._id)}>+ Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .top-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #f8f8f8;
          border-bottom: 1px solid #ddd;
        }
        .user-profile {
          font-size: 1.2em;
        }
        .icons {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .icon {
          font-size: 1.5em;
          cursor: pointer;
        }
        .flag {
          width: 30px;
          height: 20px;
        }
        .search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 20px 0;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #f9f9f9;
        }
        .search-icon {
          font-size: 1.2em;
        }
        .search-bar input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 1em;
          background: none;
        }
        .categories {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        .category-button {
          background-color: #f0f0f0;
          padding: 10px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: none;
          cursor: pointer;
        }
        .category-button.active {
          background-color: #0070f3;
          color: white;
        }
        .products {
          margin-top: 20px;
        }
        .products-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .product-item {
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        button {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
