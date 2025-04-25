
import React from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductStore } from "@/stores/productStore";
import { useOrderStore } from "@/stores/orderStore";
import { useAuthStore } from "@/stores/authStore";
import { Archive, Package, ShoppingCart, Users } from "lucide-react";

const Dashboard: React.FC = () => {
  const products = useProductStore((state) => state.products);
  const orders = useOrderStore((state) => state.orders);
  const user = useAuthStore((state) => state.user);

  const stats = [
    {
      title: "Total Productos",
      value: products.length,
      icon: <Package className="h-8 w-8 text-blue-500" />,
      color: "blue",
    },
    {
      title: "Pedidos Pendientes",
      value: orders.filter((order) => order.status === "pending").length,
      icon: <ShoppingCart className="h-8 w-8 text-yellow-500" />,
      color: "yellow",
    },
    {
      title: "Pedidos Completados",
      value: orders.filter((order) => order.status === "completed").length,
      icon: <Archive className="h-8 w-8 text-green-500" />,
      color: "green",
    },
    {
      title: "Usuarios",
      value: 2, // Placeholder for user count
      icon: <Users className="h-8 w-8 text-purple-500" />,
      color: "purple",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <div className="text-sm text-gray-500">
            Bienvenido, {user?.name || user?.email || "Admin"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Últimos Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">
                          {product.category}
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold">${product.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimos Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No hay pedidos recientes
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <div className="font-medium">Pedido #{order.id}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="font-semibold">${order.total.toFixed(2)}</div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
