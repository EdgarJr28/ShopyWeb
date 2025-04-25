
import React from "react";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        
        <section className="py-16 bg-white dark:bg-gaming-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">¿Por qué elegir GameStore?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="p-6 bg-gray-50 dark:bg-gaming-card rounded-xl">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gaming-primary rounded-full text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
                  <p className="text-gray-600 dark:text-gray-300">Productos originales con garantía oficial de los fabricantes.</p>
                </div>
                
                <div className="p-6 bg-gray-50 dark:bg-gaming-card rounded-xl">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gaming-primary rounded-full text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Mejores Precios</h3>
                  <p className="text-gray-600 dark:text-gray-300">Ofrecemos los precios más competitivos del mercado.</p>
                </div>
                
                <div className="p-6 bg-gray-50 dark:bg-gaming-card rounded-xl">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gaming-primary rounded-full text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Soporte Personalizado</h3>
                  <p className="text-gray-600 dark:text-gray-300">Atención directa por WhatsApp para resolver todas tus dudas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
