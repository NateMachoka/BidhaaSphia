import { useSearchParams } from 'next/navigation';

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  // Fetch products based on query
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/search?name=${query}`);
        const data = await response.json();
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : products.length > 0 ? (
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product._id} className="p-4 bg-gray-100 rounded shadow">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-blue-500 font-bold">${product.price}</p>
              <p className="text-green-500">
                {product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No products found</p>
      )}
    </div>
  );
};

export default ResultsPage;
