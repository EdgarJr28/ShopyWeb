
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products as allProducts } from "@/data/products";

const Products: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");

  const [products, setProducts] = useState(allProducts);
  const [category, setCategory] = useState<string | null>(categoryParam);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Extract unique categories
  const categories = ["All", ...new Set(allProducts.map(product => product.category))];

  useEffect(() => {
    // Filter products based on category
    let filtered = [...allProducts];
    if (category && category !== "All") {
      filtered = filtered.filter(product => product.category === category);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    setProducts(filtered);
  }, [category, sortBy]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory === "All" ? null : newCategory);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gaming-background">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-8">Nuestras Consolas</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <div className="lg:w-1/4 p-6 bg-white dark:bg-gaming-card rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Categorías</h2>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      (cat === "All" && !category) || cat === category
                        ? "bg-gaming-primary text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Mostrando {products.length} productos
                </p>
                <div className="flex items-center">
                  <label htmlFor="sort" className="mr-2 text-gray-600 dark:text-gray-300">
                    Ordenar por:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gaming-card text-gray-700 dark:text-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gaming-primary"
                  >
                    <option value="featured">Destacados</option>
                    <option value="price-low">Precio: Menor a Mayor</option>
                    <option value="price-high">Precio: Mayor a Menor</option>
                    <option value="rating">Mejor Valorados</option>
                  </select>
                </div>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    No se encontraron productos en esta categoría.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
