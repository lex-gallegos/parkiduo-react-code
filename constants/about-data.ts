import { 
  Users, 
  Target, 
  Heart, 
  Shield,
  Award,
  TrendingUp,
  MapPin,
  CheckCircle
} from 'lucide-react';

export const teamMembers = [
  {
    name: 'Pablo Martínez',
    role: 'CEO & Fundador',
    bio: 'Ingeniero Industrial con experiencia en startups. Apasionado por resolver problemas urbanos.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    linkedin: '#'
  },
  {
    name: 'Laura García',
    role: 'CTO',
    bio: 'Desarrolladora Full-Stack con 8 años de experiencia. Experta en arquitecturas escalables.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=300&h=300&fit=crop&crop=face',
    linkedin: '#'
  },
  {
    name: 'Carlos Ruiz',
    role: 'Head of Growth',
    bio: 'Especialista en marketing digital y growth hacking. Anteriormente en Glovo y Cabify.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    linkedin: '#'
  },
  {
    name: 'Ana López',
    role: 'Customer Success',
    bio: 'Psicóloga especializada en experiencia de cliente. Le encanta ayudar a nuestros usuarios.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    linkedin: '#'
  }
];

export const companyValues = [
  {
    icon: Target,
    title: 'Simplicidad',
    description: 'Hacemos que encontrar o alquilar una plaza de garaje sea tan fácil como pedir un taxi.'
  },
  {
    icon: Shield,
    title: 'Confianza',
    description: 'Contratos legales, pagos seguros y soporte humano en cada paso del proceso.'
  },
  {
    icon: Heart,
    title: 'Cercanía',
    description: 'Somos un equipo humano que entiende las necesidades reales de conductores y propietarios.'
  },
  {
    icon: TrendingUp,
    title: 'Innovación',
    description: 'Utilizamos tecnología para crear soluciones que realmente funcionan en la vida real.'
  }
];

export const companyMilestones = [
  {
    year: '2023',
    title: 'Fundación de Parkiduo',
    description: 'Nace la idea tras la frustración personal de buscar garaje en Madrid durante meses.'
  },
  {
    year: '2023 Q4',
    title: 'Primeros usuarios',
    description: 'Lanzamos el MVP con 50 plazas en Madrid y Barcelona. Primeros contratos exitosos.'
  },
  {
    year: '2024 Q1',
    title: 'Expansión nacional',
    description: 'Llegamos a Valencia, Sevilla y Bilbao. +500 usuarios activos.'
  },
  {
    year: '2024 Q2',
    title: 'Modalidad compartida',
    description: 'Lanzamos el alquiler compartido 24h, aumentando ingresos de parkers hasta 50%.'
  },
  {
    year: '2024 Q3',
    title: 'Más de 1000 contratos',
    description: 'Superamos los 1000 contratos gestionados con 98% de satisfacción.'
  },
  {
    year: 'Futuro',
    title: 'Siguientes pasos',
    description: 'Expansión internacional y nuevas funcionalidades como reservas puntuales.'
  }
];

export const companyStats = [
  { number: '+1.000', label: 'Usuarios activos', icon: Users },
  { number: '+500', label: 'Contratos gestionados', icon: Award },
  { number: '6', label: 'Ciudades disponibles', icon: MapPin },
  { number: '98%', label: 'Satisfacción cliente', icon: CheckCircle }
];