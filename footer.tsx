import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Shield, 
  Star, 
  Users, 
  Zap,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
  Heart,
  Clock,
  CheckCircle
} from 'lucide-react';
import parkiduoLogo from 'figma:asset/93b4fbbfb3db383e44ab8c7a1758731f76f35f4c.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  const handleSocialClick = (platform: string) => {
    const urls = {
      instagram: 'https://instagram.com/parkiduo',
      twitter: 'https://twitter.com/parkiduo',
      linkedin: 'https://linkedin.com/company/parkiduo'
    };
    window.open(urls[platform as keyof typeof urls], '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Testimonials Section */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="font-poppins text-2xl md:text-3xl font-bold text-white mb-4">
                Lo que dicen nuestros usuarios
              </h3>
              <p className="text-lg text-white/90">
                Más de 500 contratos exitosos y usuarios satisfechos
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 text-sm leading-relaxed">
                  "Rentabilizo mi garaje que estaba vacío. Ya llevo 3 contratos cerrados sin complicaciones."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">MG</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">María González</p>
                    <p className="text-white/70 text-xs">Propietaria · Madrid</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 text-sm leading-relaxed">
                  "Encontré garaje cerca de mi trabajo en menos de 48h. El proceso es súper sencillo."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">CR</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Carlos Ruiz</p>
                    <p className="text-white/70 text-xs">Conductor · Barcelona</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 text-sm leading-relaxed">
                  "La plataforma se encarga de todo: contratos, pagos y comunicación. Muy recomendable."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">AM</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Ana Martín</p>
                    <p className="text-white/70 text-xs">Propietaria · Valencia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-800">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="w-6 h-6 text-brand-primary" />
              <h3 className="font-poppins text-2xl md:text-3xl font-bold text-white">
                Newsletter Parkiduo
              </h3>
            </div>
            <p className="text-lg text-gray-300 mb-8">
              Recibe consejos, novedades del mercado y tips para sacar el máximo partido a tu plaza de garaje.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:bg-gray-600"
                required
              />
              <Button type="submit" className="bg-brand-primary hover:bg-blue-600 btn btn-md font-semibold">
                <ArrowRight className="w-4 h-4 mr-2" />
                Suscribirse
              </Button>
            </form>
            
            <p className="text-xs text-gray-400 mt-4">
              Sin spam. Cancela cuando quieras. Ver{' '}
              <button 
                onClick={() => onNavigate('privacy')}
                className="underline hover:no-underline text-gray-300"
              >
                política de privacidad
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src={parkiduoLogo} 
                alt="Parkiduo" 
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              La plataforma líder en España para compartir plazas de garaje. 
              Conectamos propietarios con conductores de forma segura y sencilla.
            </p>

            {/* Trust Indicators */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <span className="text-sm text-gray-300">4.8/5 en reseñas</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-brand-secondary" />
                <span className="text-sm text-gray-300">+2.500 usuarios activos</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-semantic-success" />
                <span className="text-sm text-gray-300">Verificación de identidad</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSocialClick('instagram')}
                className="btn btn-sm p-2 text-gray-400 hover:text-white hover:bg-white/10"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSocialClick('twitter')}
                className="btn btn-sm p-2 text-gray-400 hover:text-white hover:bg-white/10"
                aria-label="Síguenos en Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSocialClick('linkedin')}
                className="btn btn-sm p-2 text-gray-400 hover:text-white hover:bg-white/10"
                aria-label="Síguenos en LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Plataforma</h4>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => onNavigate('how-it-works')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cómo funciona
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('cities')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Ciudades disponibles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('faq')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Preguntas frecuentes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('blog')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sobre nosotros
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Servicios</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-semantic-success" />
                <span className="text-gray-300">Contratos seguros</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-semantic-success" />
                <span className="text-gray-300">Verificación de usuarios</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-semantic-success" />
                <span className="text-gray-300">Soporte 24/7</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-semantic-success" />
                <span className="text-gray-300">Proceso guiado</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-secondary" />
                <span className="text-gray-300">Cancelación flexible</span>
              </li>
            </ul>

            {/* CTA Section */}
            <div className="mt-8 p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-md">
              <p className="text-sm text-brand-primary mb-3 font-medium">
                ¿Tienes una plaza libre?
              </p>
              <Button 
                onClick={() => onNavigate('parker-onboarding')}
                className="btn btn-primary btn-sm w-full"
              >
                Empieza a ganar dinero
              </Button>
            </div>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Contacto</h4>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Calle Ejemplo, 123<br />
                    28001 Madrid, España
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                <a 
                  href="tel:+34666666666" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +34 666 666 666
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                <a 
                  href="mailto:hola@parkiduo.com" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  hola@parkiduo.com
                </a>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-gray-800 rounded-md p-4">
              <h5 className="font-medium text-white mb-2">Horario de atención</h5>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Lunes - Viernes: 9:00 - 20:00</p>
                <p>Sábados: 10:00 - 18:00</p>
                <p>Domingos: Cerrado</p>
              </div>
              <Badge className="bg-semantic-success/20 text-semantic-success border-semantic-success/30 mt-3">
                <div className="w-2 h-2 bg-semantic-success rounded-full mr-2"></div>
                En línea ahora
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <button 
                onClick={() => onNavigate('terms')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Términos y condiciones
              </button>
              <button 
                onClick={() => onNavigate('privacy')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política de privacidad
              </button>
              <button 
                onClick={() => onNavigate('cookies')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política de cookies
              </button>
              <button 
                onClick={() => onNavigate('cookie-preferences')}
                className="text-gray-400 hover:text-white transition-colors font-medium"
              >
                Preferencias de cookies
              </button>
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>© {currentYear} Parkiduo.</span>
              <span>Hecho con</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>en Alicante</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}