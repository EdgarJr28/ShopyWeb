
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Order } from '@/stores/orderStore';
import { formatCurrency } from '@/utils/format';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ 
  order, 
  onClose,
  onUpdateStatus
}) => {
  const [status, setStatus] = React.useState<Order['status']>(order.status);

  const handleStatusChange = (newStatus: Order['status']) => {
    setStatus(newStatus);
  };

  const handleSubmit = () => {
    if (status !== order.status) {
      onUpdateStatus(order.id, status);
    }
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Detalles del Pedido #{order.id}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Información del Pedido</h3>
              <div className="mt-2 space-y-1">
                <p><span className="font-medium">ID:</span> #{order.id}</p>
                <p><span className="font-medium">Fecha:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><span className="font-medium">Usuario:</span> {order.userId}</p>
                <p><span className="font-medium">Total:</span> {formatCurrency(order.total)}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Estado del Pedido</h3>
              <div className="mt-2">
                <Select value={status} onValueChange={(value) => handleStatusChange(value as Order['status'])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="processing">En proceso</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <h3 className="text-sm font-medium text-gray-500 mb-3">Productos</h3>
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Producto</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cantidad</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Precio</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subtotal</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-8 h-8 mr-3 rounded object-cover"
                        />
                        <span className="font-medium">{item.product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      {formatCurrency(item.product.price)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                      {formatCurrency(item.product.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <td colSpan={3} className="px-4 py-3 text-right font-medium">Total:</td>
                  <td className="px-4 py-3 text-right font-bold">{formatCurrency(order.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
