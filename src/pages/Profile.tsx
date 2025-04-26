import React from "react";
import { useAuthStore } from "@/stores/authStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";


const Profile: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gaming-background p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No has iniciado sesión</h1>
            <Button variant="default" onClick={() => window.location.href = "/login"}>
              Iniciar Sesión
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
          <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>

          <div className="bg-white dark:bg-gaming-card rounded-xl shadow-md p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Perfil centrado */}
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                alt="User avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-gaming-primary shadow-md"
              />
              <h2 className="text-2xl font-semibold mt-4">{user.name || "Nombre Usuario"}</h2>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>

            {/* Información de cuenta */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Información de Cuenta
              </h3>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 space-y-2">
                <p><span className="font-medium">Correo:</span> {user.email}</p>
                <p><span className="font-medium">Rol:</span> {user.role === "admin" ? "Administrador" : "Cliente"}</p>
              </div>

              <div className="pt-4">
                <Button variant="default" onClick={() => window.location.href = "/products"}>
                  Explorar Productos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
