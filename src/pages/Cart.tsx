
import React from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuthStore } from "@/stores/authStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { generateWhatsAppLink } from "@/utils/whatsapp";

const Cart: React.FC = () => {
  const { state, clearCart } = useCart();
  const { items, total } = state;
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  const handleWhatsAppCheckout = () => {
    // Define the WhatsApp phone number
    const phoneNumber = "1234567890";
    
    // Generate WhatsApp link with order details
    const whatsappLink = generateWhatsAppLink(phoneNumber, items, total);
    
    // Open WhatsApp in a new tab
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gaming-background py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Tu Carrito</h1>
            <Link to="/products">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Seguir comprando
              </Button>
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="bg-white dark:bg-gaming-card rounded-xl p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
                <ShoppingCart className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                Tu carrito está vacío
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Parece que aún no has añadido ningún producto a tu carrito.
              </p>
              <Link to="/products">
                <Button className="gaming-button">
                  Explorar productos
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gaming-card rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Productos ({items.reduce((count, item) => count + item.quantity, 0)})
                    </h2>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {items.map((item) => (
                        <CartItem key={item.product.id} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gaming-card rounded-xl shadow-sm overflow-hidden sticky top-24">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">
                          Subtotal
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">
                          Envío
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          A consultar
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-2xl font-bold text-gaming-primary">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {isAuthenticated ? (
                        <Button
                          onClick={handleCheckout}
                          className="w-full gaming-button h-12 text-lg"
                        >
                          Finalizar Compra
                        </Button>
                      ) : (
                        <Button
                          onClick={handleCheckout}
                          className="w-full gaming-button h-12 text-lg flex items-center justify-center"
                        >
                          <LogIn className="mr-2 h-5 w-5" />
                          Iniciar sesión para comprar
                        </Button>
                      )}
                      
                      <Button
                        onClick={handleWhatsAppCheckout}
                        variant="outline"
                        className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                      >
                        Contactar por WhatsApp
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={clearCart}
                      >
                        Vaciar carrito
                      </Button>
                    </div>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                      Al finalizar la compra podrás revisar tu pedido antes de confirmarlo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
