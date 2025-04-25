
import { CartItem } from "@/contexts/CartContext";

export function generateWhatsAppLink(
  phoneNumber: string,
  items: CartItem[],
  total: number
): string {
  // Format the order details for WhatsApp
  const orderDetails = items
    .map((item) => {
      return `• ${item.quantity}x ${item.product.name} - $${(
        item.product.price * item.quantity
      ).toFixed(2)}`;
    })
    .join("\n");

  // Create the message
  const message = `¡Hola! Me gustaría realizar el siguiente pedido:\n\n${orderDetails}\n\nTotal: $${total.toFixed(
    2
  )}\n\n¿Podrían confirmar disponibilidad y proceso de pago?`;

  // Encode the message for a URL
  const encodedMessage = encodeURIComponent(message);

  // Return the WhatsApp link
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
