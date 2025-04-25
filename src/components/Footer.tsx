
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gaming-card border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold bg-clip-text text-transparent gaming-gradient">
                GameStore
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Tu tienda especializada en consolas de videojuegos con la mejor selección y precios.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-gaming-primary dark:hover:text-gaming-primary transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 dark:text-gray-300 hover:text-gaming-primary dark:hover:text-gaming-primary transition-colors"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 dark:text-gray-300 hover:text-gaming-primary dark:hover:text-gaming-primary transition-colors"
                >
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Categorías
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products?category=Console"
                  className="text-gray-600 dark:text-gray-300 hover:text-gaming-primary dark:hover:text-gaming-primary transition-colors"
                >
                  Consolas
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=Handheld"
                  className="text-gray-600 dark:text-gray-300 hover:text-gaming-primary dark:hover:text-gaming-primary transition-colors"
                >
                  Portátiles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Contacto
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Email:</span> info@gamestore.com
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">WhatsApp:</span> +1234567890
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} GameStore. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
