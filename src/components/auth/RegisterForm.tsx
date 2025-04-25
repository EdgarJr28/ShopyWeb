import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { registerWithEmail } from "@/services/authService";

// Esquema de validación con Zod
const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Ingrese un email válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const success = await registerWithEmail(data.email, data.password, data.name);
      
      if (success) {
        toast({
          title: "Registro exitoso",
          description: "Bienvenido a GameStore",
        });
  
        navigate("/products"); // ✅ asegurate que esté bien escrito
      }
    } catch (error) {
      toast({
        title: "Error de registro",
        description: error instanceof Error ? error.message : "Ocurrió un error",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gaming-card rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Nombre</label>
          <input
            {...register("name")}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
            placeholder="Tu nombre"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Email</label>
          <input
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Contraseña</label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
            placeholder="******"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Confirmar Contraseña
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
            placeholder="******"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full gaming-button py-2 px-4 rounded-md"
        >
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-gaming-primary hover:underline">
              Iniciar Sesión
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
