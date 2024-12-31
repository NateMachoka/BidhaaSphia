import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SearchBar } from '../../components/SearchBar';

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        const categoryResponse = await fetch(`/api/categories/${id}`);
        const categoryData = await categoryResponse.json();
        setCategory(categoryData);

        const productsResponse = await fetch(`/api/products?category=${id}`);
        const productsData = await productsResponse.json();
        setProducts(productsData);
      };

      fetchCategory();
    }
  }, [id]);

  if (!category) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <SearchBar />
      <h1 className="text-2xl font-bold">{category.name} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {products.map((product) => (
          <div key={product._id} className="bg-gray-200 p-6 rounded-lg text-center">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
