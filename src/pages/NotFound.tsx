
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gaming-background py-16">
        <div className="text-center px-4">
          <h1 className="text-9xl font-bold text-gaming-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Página no encontrada</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            La página que estás buscando no existe o ha sido movida a otra ubicación.
          </p>
          <Link to="/">
            <Button className="gaming-button">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
