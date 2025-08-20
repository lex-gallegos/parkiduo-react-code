import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag,
  ChevronRight,
  BookOpen,
  TrendingUp,
  MapPin,
  Car,
  Home
} from 'lucide-react';
import { analytics } from './analytics';

interface BlogPageProps {
  onNavigate: (page: string, options?: any) => void;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  imageUrl: string;
  featured: boolean;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    analytics.trackPageView('blog');
  }, []);

  // Mock blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Cómo calcular el precio perfecto para tu plaza de garaje',
      excerpt: 'Guía completa para fijar un precio competitivo que atraiga conductores y maximice tus ingresos.',
      content: '',
      author: 'Equipo Parkiduo',
      publishDate: '2024-01-15',
      readTime: '5 min',
      category: 'Parkers',
      tags: ['precio', 'rentabilidad', 'consejos'],
      imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
      featured: true
    },
    {
      id: '2',
      title: 'Las mejores zonas para encontrar garaje en Madrid',
      excerpt: 'Análisis de las zonas con mayor disponibilidad y mejores precios en la capital.',
      content: '',
      author: 'Ana García',
      publishDate: '2024-01-12',
      readTime: '7 min',
      category: 'Drivers',
      tags: ['madrid', 'zonas', 'precios'],
      imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=250&fit=crop',
      featured: true
    },
    {
      id: '3',
      title: 'Modalidad compartida 24h: ¿Cómo funciona?',
      excerpt: 'Todo lo que necesitas saber sobre el alquiler compartido y cómo puede aumentar tus ingresos.',
      content: '',
      author: 'Carlos Ruiz',
      publishDate: '2024-01-10',
      readTime: '4 min',
      category: 'Parkers',
      tags: ['compartido', 'ingresos', 'modalidad'],
      imageUrl: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400&h=250&fit=crop',
      featured: false
    },
    {
      id: '4',  
      title: 'Derechos y obligaciones en contratos de garaje',
      excerpt: 'Marco legal que protege tanto a propietarios como a conductores en los alquileres.',
      content: '',
      author: 'Departamento Legal',
      publishDate: '2024-01-08',
      readTime: '6 min',
      category: 'Legal',
      tags: ['legal', 'contratos', 'derechos'],
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop',
      featured: false
    },
    {
      id: '5',
      title: 'Consejos para una visita exitosa del garaje',
      excerpt: 'Cómo preparar la visita para causar la mejor impresión y cerrar el acuerdo.',
      content: '',
      author: 'María López',
      publishDate: '2024-01-05',
      readTime: '3 min',
      category: 'Consejos',
      tags: ['visita', 'consejos', 'acuerdo'],
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      featured: false
    },
    {
      id: '6',
      title: 'Coches eléctricos: oportunidad para parkers',
      excerpt: 'Por qué instalar un punto de carga puede multiplicar la demanda de tu plaza.',
      content: '',
      author: 'Equipo Parkiduo',
      publishDate: '2024-01-03',
      readTime: '5 min',
      category: 'Tendencias',
      tags: ['electricos', 'carga', 'oportunidad'],
      imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=250&fit=crop',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', icon: BookOpen },
    { id: 'Parkers', name: 'Para Parkers', icon: Home }, 
    { id: 'Drivers', name: 'Para Drivers', icon: Car },
    { id: 'Consejos', name: 'Consejos', icon: TrendingUp },
    { id: 'Legal', name: 'Legal', icon: User },
    { id: 'Tendencias', name: 'Tendencias', icon: MapPin }
  ];

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handlePostClick = (postId: string) => {
    analytics.trackEvent('blog_post_open', { post_id: postId });
    // In a real app, this would navigate to the full post
    console.log('Navigate to post:', postId);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    analytics.trackEvent('blog_search', { search_term: value });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    analytics.trackEvent('blog_category_filter', { category });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              <span>Blog Parkiduo</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 leading-tight mb-6">
              Consejos, guías y{' '}
              <span className="text-brand-primary">
                novedades
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Todo lo que necesitas saber sobre el alquiler de garajes, tendencias del mercado y consejos prácticos.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-12 bg-white border-2 border-gray-200 focus:border-brand-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-brand-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-8 text-center">
              Artículos destacados
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {featuredPosts.map((post) => (
                <Card 
                  key={post.id}
                  className="cursor-pointer hover-lift border-0 shadow-md overflow-hidden"
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="aspect-video bg-gray-200">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-brand-primary/10 text-brand-primary">
                        {post.category}
                      </Badge>
                      <Badge variant="outline">Destacado</Badge>
                    </div>
                    
                    <CardTitle className="text-xl hover:text-brand-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishDate).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {regularPosts.length > 0 ? (
            <>
              <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-8 text-center">
                Todos los artículos
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {regularPosts.map((post) => (
                  <Card 
                    key={post.id}
                    className="cursor-pointer hover-lift border-0 shadow-md overflow-hidden"
                    onClick={() => handlePostClick(post.id)}
                  >
                    <div className="aspect-video bg-gray-200">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <CardHeader className="pb-2">
                      <Badge className="bg-gray-100 text-gray-600 w-fit mb-2">
                        {post.category}
                      </Badge>
                      
                      <CardTitle className="text-lg hover:text-brand-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.publishDate).toLocaleDateString('es-ES')}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span 
                            key={tag}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron artículos
              </h3>
              <p className="text-gray-600 mb-6">
                Prueba con otros términos de búsqueda o categorías
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Mostrar todos los artículos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-brand-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-poppins font-bold mb-4">
            No te pierdas nuestras novedades
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Recibe consejos, guías y las últimas tendencias del mercado de garajes
          </p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Tu email"
              className="bg-white text-gray-900 border-0"
            />
            <Button
              className="bg-brand-secondary hover:bg-teal-600 text-white px-6"
            >
              Suscribirse
            </Button>
          </div>
          
          <p className="text-sm opacity-75 mt-4">
            Sin spam. Cancela cuando quieras.
          </p>
        </div>
      </section>
    </div>
  );
}