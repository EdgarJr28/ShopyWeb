import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { loginWithEmail } from "@/services/authService";


const loginSchema = z.object({
  email: z.string().email("Ingrese un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginWithEmail(data.email, data.password);

      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de nuevo",
      });

      // Redirige según el rol si querés hacer eso desde aquí
      // navigate("/admin/dashboard"); o navigate("/products")
      navigate("/");
    } catch (error) {
      toast({
        title: "Error de inicio de sesión",
        description:
          error instanceof Error ? error.message : "Credenciales incorrectas",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gaming-card rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Email
          </label>
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
          <label className="text-sm font-medium leading-none">
            Contraseña
          </label>
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full gaming-button py-2 px-4 rounded-md"
        >
          {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes una cuenta?{" "}
            <a
              href="/register"
              className="text-gaming-primary hover:underline"
            >
              Regístrate
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
