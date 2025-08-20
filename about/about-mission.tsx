import React from 'react';
import { Users, TrendingUp } from 'lucide-react';

export function AboutMission() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-8">
            Nuestra misión
          </h2>
          
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              <strong>Democratizar el acceso al aparcamiento urbano</strong> creando un marketplace 
              transparente donde conductores encuentren plazas asequibles y propietarios moneticen 
              espacios infrautilizados.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-brand-primary" />
                  Para Conductores
                </h3>
                <p className="text-gray-600">
                  Eliminar la frustración de buscar aparcamiento, ofreciendo opciones 
                  cercanas, seguras y a precios justos.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-brand-secondary" />
                  Para Propietarios
                </h3>
                <p className="text-gray-600">
                  Generar ingresos pasivos con plazas vacías, contribuyendo a una 
                  movilidad urbana más eficiente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}