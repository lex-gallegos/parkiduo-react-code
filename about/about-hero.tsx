import React from 'react';
import { Button } from '../ui/button';
import { Users, ChevronRight, Mail } from 'lucide-react';

interface AboutHeroProps {
  onNavigate: (page: string, options?: any) => void;
}

export function AboutHero({ onNavigate }: AboutHeroProps) {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            <span>Sobre Parkiduo</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-gray-900 leading-tight mb-6">
            Conectamos personas,{' '}
            <span className="text-brand-primary">
              resolvemos problemas
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
            Somos un equipo apasionado por hacer que el aparcamiento urbano sea más fácil, justo y accesible para todos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate('home')}
              className="bg-brand-primary hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold"
            >
              Conoce la plataforma
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('mailto:hola@parkiduo.com')}
              className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-4 text-lg font-semibold"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contactar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}