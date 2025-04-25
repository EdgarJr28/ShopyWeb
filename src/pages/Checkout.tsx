
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCart } from "@/contexts/CartContext";
import { useOrderStore } from "@/stores/orderStore";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/utils/whatsapp";

// Form schema
const checkoutSchema = z.object({
  fullName: z.string().min(3, "El nombre completo es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Número de teléfono inválido"),
  address: z.string().min(5, "La dirección es requerida"),
  city: z.string().min(2, "La ciudad es requerida"),
  postalCode: z.string().min(4, "Código postal inválido"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout: React.FC = () => {
  const { state, clearCart } = useCart();
  const { addOrder } = useOrderStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: user?.email || "",
      fullName: user?.name || "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    if (state.items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "No hay productos en el carrito para finalizar la compra",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order in the store
      const order = await addOrder({
        userId: user?.id || "guest",
        items: state.items,
        total: state.total,
        status: "pending",
        address: `${data.address}, ${data.city}, ${data.postalCode}`,
        phone: data.phone,
      });

      // Generate WhatsApp link with order details
      const phoneNumber = "1234567890"; // Replace with your actual WhatsApp number
      const whatsappLink = generateWhatsAppLink(phoneNumber, state.items, state.total);

      // Clear the cart
      clearCart();

      // Show success message
      toast({
        title: "Pedido realizado",
        description: "Tu pedido ha sido registrado correctamente",
      });

      // Open WhatsApp in a new window
      window.open(whatsappLink, "_blank");

      // Redirect to confirmation page (could be created in the future)
      navigate("/products");
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al procesar tu pedido",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gaming-background p-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              No hay productos en tu carrito para finalizar la compra
            </p>
            <Button onClick={() => navigate("/products")}>
              Explorar productos
            </Button>
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
          <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div>
              <div className="bg-white dark:bg-gaming-card rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Datos de Envío</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nombre Completo</label>
                      <input
                        {...register("fullName")}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-500">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        {...register("email")}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Teléfono</label>
                    <input
                      {...register("phone")}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Dirección</label>
                    <input
                      {...register("address")}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ciudad</label>
                      <input
                        {...register("city")}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500">{errors.city.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Código Postal</label>
                      <input
                        {...register("postalCode")}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                      {errors.postalCode && (
                        <p className="text-sm text-red-500">{errors.postalCode.message}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full gaming-button mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Procesando..."
                      : "Finalizar compra por WhatsApp"}
                  </Button>

                  <p className="text-sm text-gray-500 mt-4">
                    Al finalizar la compra, serás redirigido a WhatsApp para coordinar los detalles de pago y entrega con nuestro equipo.
                  </p>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white dark:bg-gaming-card rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Resumen del Pedido</h2>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="py-4 flex justify-between">
                      <div className="flex space-x-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Envío
                    </span>
                    <span>A confirmar</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg mt-4">
                    <span>Total</span>
                    <span className="text-gaming-primary">
                      ${state.total.toFixed(2)}
                    </span>
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

export default Checkout;
