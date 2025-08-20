import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from './ui/dropdown-menu';
import { Menu, X, User, Settings, LogOut, CreditCard, Shield, Car, ChevronDown } from 'lucide-react';
import parkiduoLogo from 'figma:asset/93b4fbbfb3db383e44ab8c7a1758731f76f35f4c.png';

interface NavigationProps {
  currentPage: string;
  userType?: 'parker' | 'driver' | null;
  onNavigate: (page: string) => void;
  breadcrumbs?: Array<{label: string, href: string}>;
}

export function Navigation({ currentPage, userType, onNavigate, breadcrumbs }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (page: string, options?: any) => {
    onNavigate(page, options);
    setIsMobileMenuOpen(false);
  };

  const handleProfileNavigation = (section?: string) => {
    const profileOptions = section ? { profileSection: section } : undefined;
    handleNavigation('profile', profileOptions);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <img 
              src={parkiduoLogo} 
              alt="Parkiduo" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' 
                  ? 'text-brand-primary' 
                  : 'text-gray-700 hover:text-brand-primary'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavigation('how-it-works')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'how-it-works' 
                  ? 'text-brand-primary' 
                  : 'text-gray-700 hover:text-brand-primary'
              }`}
            >
              Cómo funciona
            </button>
            <button
              onClick={() => handleNavigation('cities')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'cities' 
                  ? 'text-brand-primary' 
                  : 'text-gray-700 hover:text-brand-primary'
              }`}
            >
              Ciudades
            </button>
            <button
              onClick={() => handleNavigation('faq')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'faq' 
                  ? 'text-brand-primary' 
                  : 'text-gray-700 hover:text-brand-primary'
              }`}
            >
              FAQ
            </button>
            
            {/* More Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    ['blog', 'about'].includes(currentPage)
                      ? 'text-brand-primary' 
                      : 'text-gray-700 hover:text-brand-primary'
                  }`}
                >
                  Más
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleNavigation('blog')}>
                  Blog
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('about')}>
                  Sobre nosotros
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation('parker-landing')}>
                  Para Parkers
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!userType ? (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('login')}
                  className="text-gray-700 hover:text-brand-primary"
                >
                  Iniciar sesión
                </Button>
                <Button
                  onClick={() => handleNavigation('register')}
                  className="bg-brand-primary hover:bg-blue-600 text-white"
                >
                  Registrarse
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="relative h-8 w-8 rounded-full"
                      aria-label="Abrir menú de usuario"
                      title="Menú de usuario"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="Usuario" />
                        <AvatarFallback className="bg-brand-primary text-white">
                          {userType === 'parker' ? 'P' : 'D'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64" align="end" forceMount>
                    {/* User Info Header */}
                    <div className="flex items-center justify-start gap-3 p-3 bg-gray-50">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="Usuario" />
                        <AvatarFallback className="bg-brand-primary text-white">
                          {userType === 'parker' ? 'P' : 'D'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1 leading-none min-w-0 flex-1">
                        <p className="font-medium text-sm text-gray-900">
                          Ana García López
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {userType === 'parker' ? 'Propietario' : 'Conductor'}
                          </Badge>
                          <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/20 text-xs">
                            Verificado
                          </Badge>
                        </div>
                        <p className="w-full truncate text-xs text-muted-foreground">
                          ana.garcia@email.com
                        </p>
                      </div>
                    </div>
                    
                    <DropdownMenuSeparator />
                    
                    {/* Main Actions */}
                    <DropdownMenuItem onClick={() => handleNavigation(`${userType}-dashboard`)}>
                      <User className="mr-3 h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">Mi Dashboard</span>
                        <span className="text-xs text-muted-foreground">Panel principal</span>
                      </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => handleProfileNavigation()}>
                      <Settings className="mr-3 h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">Editar Perfil</span>
                        <span className="text-xs text-muted-foreground">Datos personales y configuración</span>
                      </div>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    
                    {/* Quick Profile Actions */}
                    <div className="px-2 py-1">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Acceso rápido</p>
                    </div>
                    
                    {userType === 'driver' && (
                      <DropdownMenuItem onClick={() => handleProfileNavigation('vehicle')} className="pl-6">
                        <Car className="mr-3 h-3 w-3" />
                        <span className="text-sm">Mi Vehículo</span>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem onClick={() => handleProfileNavigation('verification')} className="pl-6">
                      <Shield className="mr-3 h-3 w-3" />
                      <span className="text-sm">Verificación</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => handleProfileNavigation('payments')} className="pl-6">
                      <CreditCard className="mr-3 h-3 w-3" />
                      <span className="text-sm">Pagos</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    
                    {/* Logout */}
                    <DropdownMenuItem 
                      onClick={() => handleNavigation('home')}
                      className="text-semantic-danger focus:text-semantic-danger"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="font-medium">Cerrar sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-gray-700"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              title={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleNavigation('home')}
                className={`block px-3 py-2 text-base font-medium rounded-md w-full text-left ${
                  currentPage === 'home'
                    ? 'text-brand-primary bg-blue-50'
                    : 'text-gray-700 hover:text-brand-primary hover:bg-gray-50'
                }`}
              >
                Inicio
              </button>
              <button
                onClick={() => handleNavigation('how-it-works')}
                className={`block px-3 py-2 text-base font-medium rounded-md w-full text-left ${
                  currentPage === 'how-it-works'
                    ? 'text-brand-primary bg-blue-50'
                    : 'text-gray-700 hover:text-brand-primary hover:bg-gray-50'
                }`}
              >
                Cómo funciona
              </button>
              <button
                onClick={() => handleNavigation('cities')}
                className={`block px-3 py-2 text-base font-medium rounded-md w-full text-left ${
                  currentPage === 'cities'
                    ? 'text-brand-primary bg-blue-50'
                    : 'text-gray-700 hover:text-brand-primary hover:bg-gray-50'
                }`}
              >
                Ciudades
              </button>
              <button
                onClick={() => handleNavigation('faq')}
                className={`block px-3 py-2 text-base font-medium rounded-md w-full text-left ${
                  currentPage === 'faq'
                    ? 'text-brand-primary bg-blue-50'
                    : 'text-gray-700 hover:text-brand-primary hover:bg-gray-50'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavigation('blog')}
                className={`block px-3 py-2 text-base font-medium rounded-md w-full text-left ${
                  currentPage === 'blog'
                    ? 'text-brand-primary bg-blue-50'
                    : 'text-gray-700 hover:text-brand-primary hover:bg-gray-50'
                }`}
              >
                Blog
              </button>
              <button
                onClick={() => handleNavigation('about')}
                className={`block px-3 py-2 text-base font-medium rounded-md w-full text-left ${
                  currentPage === 'about'
                    ? 'text-brand-primary bg-blue-50'
                    : 'text-gray-700 hover:text-brand-primary hover:bg-gray-50'
                }`}
              >
                Sobre nosotros
              </button>
              
              {!userType ? (
                <div className="pt-4 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('login')}
                    className="w-full justify-start text-gray-700 hover:text-brand-primary mb-2"
                  >
                    Iniciar sesión
                  </Button>
                  <Button
                    onClick={() => handleNavigation('register')}
                    className="w-full bg-brand-primary hover:bg-blue-600 text-white"
                  >
                    Registrarse
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-1">
                  {/* User Info */}
                  <div className="flex items-center gap-3 px-3 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Usuario" />
                      <AvatarFallback className="bg-brand-primary text-white text-sm">
                        {userType === 'parker' ? 'P' : 'D'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0 flex-1">
                      <p className="font-medium text-sm text-gray-900 truncate">Ana García López</p>
                      <p className="text-xs text-muted-foreground">
                        {userType === 'parker' ? 'Propietario' : 'Conductor'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Navigation Options */}
                  <button
                    onClick={() => handleNavigation(`${userType}-dashboard`)}
                    className="block px-3 py-2 text-base font-medium rounded-md w-full text-left text-gray-700 hover:text-brand-primary hover:bg-gray-50"
                  >
                    <User className="inline-block mr-3 h-4 w-4" />
                    Mi Dashboard
                  </button>
                  
                  <button
                    onClick={() => handleProfileNavigation()}
                    className="block px-3 py-2 text-base font-medium rounded-md w-full text-left text-gray-700 hover:text-brand-primary hover:bg-gray-50"
                  >
                    <Settings className="inline-block mr-3 h-4 w-4" />
                    Mi Perfil
                  </button>
                  
                  <button
                    onClick={() => handleNavigation('home')}
                    className="block px-3 py-2 text-base font-medium rounded-md w-full text-left text-semantic-danger hover:text-semantic-danger hover:bg-red-50"
                  >
                    <LogOut className="inline-block mr-3 h-4 w-4" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}