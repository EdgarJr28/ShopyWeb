
import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gaming-background py-16">
        <div className="w-full max-w-md px-4">
          <RegisterForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-gaming-primary hover:underline">
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
