import React from 'react';
import { Button } from '../ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

export function AboutContact() {
  return (
    <section className="py-20 bg-brand-primary text-white" aria-labelledby="contact-title">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="contact-title" className="text-3xl md:text-4xl font-poppins font-bold text-white mb-6">
            ¿Hablamos?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Estamos aquí para resolver tus dudas y ayudarte en lo que necesites
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-200 group-hover:scale-105 motion-safe">
                <Mail className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-poppins font-semibold text-white mb-2">Email</h3>
              <p className="text-white/90 font-medium">
                <a 
                  href="mailto:hola@parkiduo.com"
                  className="hover:text-white transition-colors focus-enhanced"
                  aria-label="Enviar email a hola@parkiduo.com"
                >
                  hola@parkiduo.com
                </a>
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-200 group-hover:scale-105 motion-safe">
                <Phone className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-poppins font-semibold text-white mb-2">WhatsApp</h3>
              <p className="text-white/90 font-medium">
                <a 
                  href="https://wa.me/34689123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors focus-enhanced"
                  aria-label="Contactar por WhatsApp al +34 689 123 456"
                >
                  +34 689 123 456
                </a>
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-200 group-hover:scale-105 motion-safe">
                <MapPin className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-poppins font-semibold text-white mb-2">Oficina</h3>
              <p className="text-white/90 font-medium">Madrid, España</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.open('mailto:hola@parkiduo.com')}
              className="btn btn-lg bg-white text-brand-primary hover:bg-gray-100 focus-enhanced"
              aria-label="Abrir cliente de email para enviar mensaje a hola@parkiduo.com"
            >
              <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
              Enviar email
            </Button>
            
            <Button
              onClick={() => window.open('https://wa.me/34689123456', '_blank')}
              className="btn btn-lg border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-primary focus-enhanced transition-all duration-200"
              aria-label="Abrir WhatsApp para contactar al +34 689 123 456"
            >
              <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
              WhatsApp
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-white/80">
            Respuesta en menos de 24 horas • Soporte en español
          </div>
        </div>
      </div>
    </section>
  );
}