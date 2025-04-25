
import React from "react";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 flex-shrink-0">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
        </Link>
      </div>

      <div className="sm:ml-6 flex-grow">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <Link to={`/products/${product.id}`}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white hover:text-gaming-primary dark:hover:text-gaming-primary transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {product.category}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex flex-col items-end">
            <span className="text-gray-900 dark:text-white font-medium">
              ${(product.price * quantity).toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ${product.price.toFixed(2)} / unidad
            </span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="mx-3 w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleIncrement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            <span>Eliminar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
