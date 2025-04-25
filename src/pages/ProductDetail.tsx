
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Producto no encontrado</h2>
            <Button onClick={() => navigate("/products")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a productos
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Añadido al carrito",
      description: `${product.name} ha sido añadido al carrito`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gaming-background py-10">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/products")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a productos
          </Button>

          <div className="bg-white dark:bg-gaming-card rounded-xl overflow-hidden shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative h-80 md:h-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                        {product.rating}
                      </span>
                    </div>
                    <span className="mx-2">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {product.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Características</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start"
                      >
                        <span className="inline-block w-5 h-5 mr-2 bg-gaming-primary text-white rounded-full flex-shrink-0 flex items-center justify-center text-xs">
                          ✓
                        </span>
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Stock disponible: {product.stock} unidades
                      </p>
                    </div>
                    <Button
                      onClick={handleAddToCart}
                      className="gaming-button"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Añadir al carrito
                    </Button>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-xl font-semibold mb-4">Especificaciones</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-200">
                          {key}:
                        </span>{" "}
                        <span className="text-gray-600 dark:text-gray-300">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
