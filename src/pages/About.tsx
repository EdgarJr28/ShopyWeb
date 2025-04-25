
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gaming-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Sobre Nosotros</h1>
            
            <div className="bg-white dark:bg-gaming-card rounded-xl shadow-sm overflow-hidden mb-12">
              <div className="aspect-w-16 aspect-h-6 relative h-80">
                <img
                  src="https://images.unsplash.com/photo-1633174524827-db00a6b7bc74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2196&q=80"
                  alt="Gaming Store Team"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
              </div>
              
              <div className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  GameStore nació en 2018 con una misión clara: llevar la mejor experiencia de videojuegos a todos los hogares. 
                  Fundada por un grupo de apasionados gamers, nuestra tienda comenzó como un pequeño emprendimiento y ha crecido 
                  hasta convertirse en un referente en la venta de consolas de videojuegos.
                </p>
                
                <p className="text-gray-600 dark:text-gray-300">
                  Nos especializamos en ofrecer las consolas más recientes y populares del mercado, con un enfoque en la calidad, 
                  el servicio personalizado y los mejores precios. Nuestra innovadora forma de atención por WhatsApp nos permite 
                  estar siempre disponibles para nuestros clientes, resolviendo sus dudas y brindando asesoramiento experto.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-gaming-card rounded-xl shadow-sm overflow-hidden p-8">
                <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Nuestra misión es democratizar el acceso a las mejores consolas de videojuegos, brindando 
                  una experiencia de compra personalizada y cercana, donde el cliente siempre es lo primero. 
                  Queremos ser el puente que conecta a los jugadores con la tecnología que aman.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gaming-card rounded-xl shadow-sm overflow-hidden p-8">
                <h2 className="text-2xl font-semibold mb-4">Nuestra Visión</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Aspiramos a ser la tienda de referencia en la venta de consolas de videojuegos, reconocida por 
                  nuestra excelencia en el servicio al cliente, nuestra capacidad de innovación y nuestro compromiso 
                  con la comunidad gamer.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gaming-card rounded-xl shadow-sm overflow-hidden p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-4">¿Por qué elegirnos?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gaming-primary rounded-full text-white mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Garantía en todos los productos</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Todos nuestros productos cuentan con garantía oficial de los fabricantes.
                  </p>
                </div>
                
                <div className="p-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gaming-primary rounded-full text-white mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Atención personalizada</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Atención directa por WhatsApp para una experiencia de compra más personal.
                  </p>
                </div>
                
                <div className="p-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gaming-primary rounded-full text-white mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Mejores precios</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Ofrecemos los precios más competitivos del mercado.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">¿Listo para unirte a nuestra comunidad?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Explora nuestra selección de consolas y comienza tu viaje gaming con nosotros.
              </p>
              <Link to="/products">
                <Button className="gaming-button">
                  Ver productos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
