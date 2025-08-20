import image_82db8a3f2b5c9f1e717c65fac7eee51e1c2efb90 from 'figma:asset/82db8a3f2b5c9f1e717c65fac7eee51e1c2efb90.png';
import image_c4bb859071ea1e784dcaf0102559fc75995c0ef0 from 'figma:asset/c4bb859071ea1e784dcaf0102559fc75995c0ef0.png';
export const mockGarages = [
  {
    id: 1,
    address: 'Calle Alcalá 42, Madrid',
    price: 85,
    availability: '24h',
    status: 'active',
    views: 124,
    requests: 8,
    activeRequests: 3,
    image: image_c4bb859071ea1e784dcaf0102559fc75995c0ef0,
    createdDate: '2024-01-15',
    lastActivity: '2 horas',
    demandLevel: 'alta'
  },
  {
    id: 2,
    address: 'Calle Serrano 15, Madrid',
    price: 95,
    availability: 'Diurno',
    status: 'paused',
    views: 67,
    requests: 3,
    activeRequests: 0,
    image: image_82db8a3f2b5c9f1e717c65fac7eee51e1c2efb90,
    createdDate: '2024-01-10',
    lastActivity: '1 día',
    demandLevel: 'media'
  }
];

export const mockRequests = [
  {
    id: 1,
    garageId: 1,
    garage: 'Calle Alcalá 42',
    driver: {
      name: 'Carlos Ruiz',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      rating: 4.9,
      vehicleInfo: 'Audi A4 (Berlina)',
      joinDate: 'Miembro desde Nov 2023'
    },
    requestDate: '2024-01-17',
    status: 'pending',
    message: 'Hola, trabajo cerca y necesito garaje de 8:00 a 18:00 de lunes a viernes. Soy muy cuidadoso con el vehículo.',
    preferredVisitTimes: ['Mañana 18 Enero 10:00', 'Tarde 18 Enero 18:30', 'Mañana 19 Enero 09:00']
  },
  {
    id: 2,
    garageId: 1,
    garage: 'Calle Alcalá 42',
    driver: {
      name: 'Ana Martín',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      rating: 4.8,
      vehicleInfo: 'BMW X1 (SUV)',
      joinDate: 'Miembro desde Dic 2023'
    },
    requestDate: '2024-01-16',
    status: 'approved',
    visitDateTime: '2024-01-18 18:00',
    message: 'Me interesa mucho el garaje. Soy conductora responsable y cuidadosa.',
    contact: '+34 666 789 012'
  },
  {
    id: 3,
    garageId: 1,
    garage: 'Calle Alcalá 42',
    driver: {
      name: 'Miguel González',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      rating: 4.7,
      vehicleInfo: 'Toyota Corolla (Compacto)',
      joinDate: 'Miembro desde Oct 2023'
    },
    requestDate: '2024-01-14',
    status: 'visited',
    visitDateTime: '2024-01-16 17:00',
    message: 'Perfecto para mis horarios laborales. Muy interesado.',
    contact: '+34 666 456 789'
  }
];

export type GarageStatus = 'active' | 'paused' | 'inactive';
export type RequestStatus = 'pending' | 'approved' | 'visited' | 'rejected' | 'matched';
export type DemandLevel = 'alta' | 'media' | 'baja';