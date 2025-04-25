
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useProductStore } from '@/stores/productStore';
import { Product } from '@/types/product';

// Schema for product form validation
const productSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.coerce.number().positive('El precio debe ser positivo'),
  image: z.string().url('La URL de la imagen no es válida'),
  category: z.string().min(1, 'La categoría es obligatoria'),
  stock: z.coerce.number().int().nonnegative('El stock debe ser un número entero no negativo'),
  rating: z.coerce.number().min(0, 'La calificación mínima es 0').max(5, 'La calificación máxima es 5'),
  features: z.string(),
  specifications: z.string()
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ product, onClose }) => {
  const { toast } = useToast();
  const { addProduct, updateProduct } = useProductStore();
  const isEditing = !!product;

  // Convert product data for the form
  const defaultValues: ProductFormValues = isEditing 
    ? {
        ...product,
        features: product.features.join('\n'),
        specifications: Object.entries(product.specifications)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n')
      }
    : {
        name: '',
        description: '',
        price: 0,
        image: '',
        category: '',
        stock: 0,
        rating: 0,
        features: '',
        specifications: ''
      };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      // Convert form data back to product format
      const productData = {
        ...data,
        features: data.features.split('\n').filter(f => f.trim()),
        specifications: data.specifications.split('\n').reduce((acc, line) => {
          const [key, value] = line.split(':').map(part => part.trim());
          if (key && value) {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, string>)
      };

      if (isEditing && product) {
        await updateProduct(product.id, productData);
        toast({
          title: 'Producto actualizado',
          description: 'El producto ha sido actualizado correctamente'
        });
      } else {
        await addProduct(productData);
        toast({
          title: 'Producto creado',
          description: 'El producto ha sido creado correctamente'
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al guardar el producto',
        variant: 'destructive'
      });
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre</label>
              <Input 
                {...register('name')} 
                placeholder="Nombre del producto"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Categoría</label>
              <Input 
                {...register('category')} 
                placeholder="Categoría"
              />
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción</label>
            <Textarea 
              {...register('description')} 
              placeholder="Descripción detallada del producto" 
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Precio</label>
              <Input 
                {...register('price')} 
                type="number"
                step="0.01"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Stock</label>
              <Input 
                {...register('stock')} 
                type="number" 
                placeholder="0"
              />
              {errors.stock && (
                <p className="text-sm text-red-500">{errors.stock.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Rating</label>
              <Input 
                {...register('rating')} 
                type="number" 
                step="0.1"
                min="0"
                max="5"
                placeholder="0.0"
              />
              {errors.rating && (
                <p className="text-sm text-red-500">{errors.rating.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">URL de Imagen</label>
            <Input 
              {...register('image')} 
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Características (una por línea)</label>
            <Textarea 
              {...register('features')} 
              placeholder="Característica 1&#10;Característica 2&#10;Característica 3" 
              rows={3}
            />
            {errors.features && (
              <p className="text-sm text-red-500">{errors.features.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Especificaciones (una por línea, formato "Clave: Valor")</label>
            <Textarea 
              {...register('specifications')} 
              placeholder="CPU: Modelo CPU&#10;GPU: Modelo GPU&#10;Memoria: 16GB" 
              rows={3}
            />
            {errors.specifications && (
              <p className="text-sm text-red-500">{errors.specifications.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? (isEditing ? 'Actualizando...' : 'Creando...') 
                : (isEditing ? 'Actualizar' : 'Crear')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
