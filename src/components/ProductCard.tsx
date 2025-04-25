
import React from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Añadido al carrito",
      description: `${product.name} ha sido añadido al carrito`,
    });
  };

  return (
    <div className="product-card flex flex-col h-full">
      <Link to={`/products/${product.id}`} className="block overflow-hidden">
        <div className="relative h-48 sm:h-64 overflow-hidden group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <Link to={`/products/${product.id}`}>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white hover:text-gaming-primary dark:hover:text-gaming-primary transition-colors duration-200">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                {product.rating}
              </span>
            </div>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-auto flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="border-gaming-primary text-gaming-primary hover:bg-gaming-primary hover:text-white dark:border-gaming-primary dark:text-gaming-primary"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Añadir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
