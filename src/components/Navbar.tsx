import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuthStore } from "@/stores/authStore";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { state } = useCart();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = !!user;

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();
    localStorage.removeItem("auth-storage");
    navigate("/");
  };

  // ✅ Redirigir automáticamente al dashboard si es admin
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const AuthMenu = (
    <>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              Mi perfil
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>
                Panel Admin
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleLogout}>
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <Button variant="ghost" size="icon">
            <LogIn className="h-5 w-5" />
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gaming-background shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent gaming-gradient">
              GameStore
            </span>
          </Link>

          {isMobile ? (
            <>
              <div className="flex items-center space-x-4">
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gaming-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </Link>

                {AuthMenu}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>

              {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gaming-background shadow-lg z-50">
                  <nav className="flex flex-col">
                    <Link
                      to="/"
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Inicio
                    </Link>
                    <Link
                      to="/products"
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Productos
                    </Link>
                    <Link
                      to="/about"
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Nosotros
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </>
          ) : (
            <>
              <nav className="flex items-center space-x-8">
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-200 hover:text-gaming-primary dark:hover:text-gaming-primary font-medium"
                >
                  Inicio
                </Link>
                <Link
                  to="/products"
                  className="text-gray-700 dark:text-gray-200 hover:text-gaming-primary dark:hover:text-gaming-primary font-medium"
                >
                  Productos
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 dark:text-gray-200 hover:text-gaming-primary dark:hover:text-gaming-primary font-medium"
                >
                  Nosotros
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="text-gray-700 dark:text-gray-200 hover:text-gaming-primary dark:hover:text-gaming-primary font-medium"
                  >
                    Admin
                  </Link>
                )}
              </nav>

              <div className="flex items-center space-x-4">
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gaming-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </Link>

                {AuthMenu}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
