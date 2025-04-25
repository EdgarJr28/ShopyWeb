import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrderStore } from "@/stores/orderStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const OrderSummary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders } = useOrderStore();

  const query = new URLSearchParams(location.search);
  const orderId = query.get("id");

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gaming-background">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Pedido no encontrado</h2>
            <Button onClick={() => navigate("/products")}>Volver a productos</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gaming-background py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Resumen del Pedido</h1>
          <div className="bg-white dark:bg-gaming-card rounded-xl shadow p-6 space-y-6">
            <div>
              <p className="text-gray-600">ID del Pedido:</p>
              <p className="font-semibold">{order.id}</p>
            </div>
            <div>
              <p className="text-gray-600">Fecha:</p>
              <p>{format(new Date(order.createdAt), "PPPp")}</p>
            </div>
            <div>
              <p className="text-gray-600">Estado:</p>
              <p className="font-semibold capitalize">{order.status}</p>
            </div>
            <div>
              <p className="text-gray-600">Total:</p>
              <p className="text-lg font-bold text-gaming-primary">${order.total.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600">Dirección:</p>
              <p>{order.address}</p>
            </div>
            <div>
              <p className="text-gray-600">Teléfono:</p>
              <p>{order.phone}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mt-6">Productos</h2>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSummary;
