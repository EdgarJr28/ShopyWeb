
import React from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const FeaturedProducts: React.FC = () => {
  // Get top 3 featured products (highest rated)
  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gaming-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Consolas Destacadas</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explora nuestra selección de las consolas de videojuegos más populares y mejor valoradas por la comunidad gamer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
