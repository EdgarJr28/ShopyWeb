
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gaming-background">
      <div className="text-center p-8 max-w-md">
        <div className="mx-auto w-20 h-20 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
          <Shield className="h-10 w-10 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Acceso Denegado</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          No tienes permisos para acceder a esta página. Por favor contacta al administrador si crees que es un error.
        </p>
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full my-1">
              Volver al Inicio
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="w-full">
              Iniciar Sesión con Otra Cuenta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
