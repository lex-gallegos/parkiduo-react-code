import { useState, useEffect } from 'react';
import { Navigation } from './components/navigation';
import { HomePageRefined } from './components/home-page-refined';
import { DriverOnboarding } from './components/driver-onboarding';
import { DriverSuccess } from './components/driver-success';
import { DriverDashboard } from './components/driver-dashboard';
import { ParkerOnboarding } from './components/parker-onboarding';
import { ParkerSuccess } from './components/parker-success';
import { ParkerDashboard } from './components/parker-dashboard';
import { HowItWorksPage } from './components/how-it-works';
import { CitiesPage } from './components/cities';
import { FAQPage } from './components/faq';
import { LoginPage } from './components/auth/login-page';
import { RegisterPage } from './components/auth/register-page';
import { VerifyEmailPage } from './components/auth/verify-email-page';
import { OTPVerificationPage } from './components/auth/otp-verification-page';
import { ForgotPasswordPage } from './components/auth/forgot-password-page';
import { ResetPasswordPage } from './components/auth/reset-password-page';
import { CompleteProfilePage } from './components/auth/complete-profile-page';
import { AccountBlockedPage } from './components/auth/account-blocked-page';
import { CaptchaPage } from './components/auth/captcha-page';
import { SessionExpiredPage } from './components/auth/session-expired-page';
import { AuthDemoPage } from './components/auth/auth-demo-page';
import { ProfilePage } from './components/profile/profile-page';
import { ExploreGaragesPage } from './components/driver/explore-garages';
import { MySearchesPage } from './components/driver/my-searches-page';
import { SentRequestsPage } from './components/driver/sent-requests-page';
import { MyGaragesPage } from './components/parker/my-garages-page';
import { ReceivedRequestsPage } from './components/parker/received-requests-page';
import { ContractWizard } from './components/contracts/contract-wizard';
import { ContractSuccess } from './components/contracts/contract-success';
import { MyContractsPage } from './components/contracts/my-contracts';
import { CancellationWizard } from './components/contracts/cancellation-wizard';
import { PriorityUpgradeModal } from './components/driver/priority-upgrade-modal';
import { ParkerLanding } from './components/parker-landing';
import { BlogPage } from './components/blog-page';
import { AboutPage } from './components/about-page';
import { AdminDashboard } from './components/admin/admin-dashboard';
import { NotFoundPage } from './components/errors/not-found';
import { ServerErrorPage } from './components/errors/server-error';
import { MaintenancePage } from './components/errors/maintenance';
import { TermsPage } from './components/legal/terms';
import { PrivacyPage } from './components/legal/privacy';
import { CookiesPage } from './components/legal/cookies';
import { CookiePreferences } from './components/legal/cookie-preferences';
import { Toaster } from './components/ui/sonner';
import { WhatsAppCTA } from './components/whatsapp-cta';
import { toast } from 'sonner@2.0.3';


type UserType = 'parker' | 'driver' | 'admin' | null;
type Page = 
  // Public pages
  | 'home'
  | 'how-it-works'
  | 'cities'
  | 'faq'
  | 'blog'
  | 'about'
  | 'parker-landing'
  | 'login'
  | 'register'
  | 'verify-email'
  | 'otp-verification' 
  | 'forgot-password'
  | 'reset-password'
  | 'complete-profile'
  | 'account-blocked'
  | 'captcha'
  | 'session-expired'
  | 'auth-demo'
  // Driver pages
  | 'driver-onboarding'
  | 'driver-success'
  | 'driver-dashboard'
  | 'explore-garages'
  | 'my-searches'
  | 'sent-requests'
  | 'priority-upgrade'
  // Parker pages
  | 'parker-onboarding'
  | 'parker-success'
  | 'parker-dashboard'
  | 'my-garages'
  | 'received-requests'
  // Contract pages
  | 'contract-wizard'
  | 'contract-success'
  | 'my-contracts'
  | 'cancellation-wizard'
  // Profile & settings
  | 'profile'
  | 'cookie-preferences'
  // Admin pages
  | 'admin-dashboard'
  // Legal pages
  | 'terms'
  | 'privacy'
  | 'cookies'
  // Error pages
  | '404'
  | '500'
  | 'maintenance';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userType, setUserType] = useState<UserType>(null);
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{label: string, href: string}>>([]);
  const [navigationOptions, setNavigationOptions] = useState<any>(null);

  // Handle navigation with analytics tracking
  const handleNavigate = (page: string, options?: { userType?: UserType, analytics?: string, profileSection?: string, scrollToSection?: string }) => {
    // Track navigation events
    if (options?.analytics && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: page,
        page_location: page
      });
    }

    // Handle user type changes
    if (options?.userType) {
      setUserType(options.userType);
    } else if (page.includes('driver') && userType !== 'driver') {
      setUserType('driver');
    } else if (page.includes('parker') && userType !== 'parker') {
      setUserType('parker');
    } else if (page === 'my-garages' && userType !== 'parker') {
      setUserType('parker');
    } else if (page.includes('admin') && userType !== 'admin') {
      setUserType('admin');
    }
    
    // Handle logout
    if (page === 'home' && (currentPage.includes('dashboard') || currentPage.includes('profile'))) {
      setUserType(null);
      toast.success('Sesión cerrada correctamente');
    }

    // Update breadcrumbs based on page
    updateBreadcrumbs(page as Page);
    
    setCurrentPage(page as Page);
    setNavigationOptions(options);
    
    // Handle scrolling - either to section or top
    if (options?.scrollToSection) {
      // Wait for navigation to complete then scroll to section
      setTimeout(() => {
        const element = document.getElementById(options.scrollToSection!);
        if (element) {
          // Get element position and offset for fixed navigation
          const elementPosition = element.offsetTop;
          const offsetPosition = elementPosition - 80; // Account for fixed navigation height
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Scroll to top on navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Update breadcrumbs based on current page
  const updateBreadcrumbs = (page: Page) => {
    const breadcrumbMap: Record<string, Array<{label: string, href: string}>> = {
      'driver-onboarding': [
        { label: 'Inicio', href: 'home' },
        { label: 'Registro Conductor', href: 'driver-onboarding' }
      ],
      'parker-onboarding': [
        { label: 'Inicio', href: 'home' },
        { label: 'Publicar Garaje', href: 'parker-onboarding' }
      ],
      'contract-wizard': [
        { label: 'Dashboard', href: userType === 'parker' ? 'parker-dashboard' : 'driver-dashboard' },
        { label: 'Generar Contrato', href: 'contract-wizard' }
      ],
      'profile': [
        { label: 'Dashboard', href: userType === 'parker' ? 'parker-dashboard' : 'driver-dashboard' },
        { label: 'Mi Perfil', href: 'profile' }
      ]
    };

    setBreadcrumbs(breadcrumbMap[page] || []);
  };

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const page = event.state?.page || 'home';
      setCurrentPage(page);
      if (event.state?.userType) {
        setUserType(event.state.userType);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Push initial state
    window.history.replaceState({ page: currentPage, userType }, '', `/${currentPage}`);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update history when page changes
  useEffect(() => {
    if (currentPage !== 'home' || userType) {
      window.history.pushState(
        { page: currentPage, userType }, 
        '', 
        `/${currentPage}`
      );
    }
  }, [currentPage, userType]);

  // Handle priority upgrade modal
  const handlePriorityUpgrade = () => {
    setShowPriorityModal(true);
  };

  const handlePriorityUpgradeClose = (upgraded?: boolean) => {
    setShowPriorityModal(false);
    if (upgraded) {
      toast.success('¡Prioridad 24h activada! Ya puedes ver nuevas plazas antes que otros conductores');
    }
  };

  // Render current page component
  const renderCurrentPage = () => {
    switch (currentPage) {
      // Public pages
      case 'home':
        return <HomePageRefined onNavigate={handleNavigate} />;
      case 'how-it-works':
        return <HowItWorksPage onNavigate={handleNavigate} />;
      case 'cities':
        return <CitiesPage onNavigate={handleNavigate} isAdminMode={userType === 'admin'} />;
      case 'faq':
        return <FAQPage onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'parker-landing':
        return <ParkerLanding onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} redirectTo={navigationOptions?.redirectTo} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} redirectTo={navigationOptions?.redirectTo} />;
      case 'verify-email':
        return <VerifyEmailPage onNavigate={handleNavigate} {...navigationOptions} />;
      case 'otp-verification':
        return <OTPVerificationPage onNavigate={handleNavigate} {...navigationOptions} />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={handleNavigate} />;
      case 'reset-password':
        return <ResetPasswordPage onNavigate={handleNavigate} {...navigationOptions} />;
      case 'complete-profile':
        return <CompleteProfilePage onNavigate={handleNavigate} {...navigationOptions} />;
      case 'account-blocked':
        return <AccountBlockedPage onNavigate={handleNavigate} {...navigationOptions} />;
      case 'captcha':
        return <CaptchaPage onNavigate={handleNavigate} {...navigationOptions} />;
      case 'session-expired':
        return <SessionExpiredPage onNavigate={handleNavigate} {...navigationOptions} />;
      case 'auth-demo':
        return <AuthDemoPage onNavigate={handleNavigate} />;

      // Driver pages
      case 'driver-onboarding':
        return <DriverOnboarding onNavigate={handleNavigate} />;
      case 'driver-success':
        return <DriverSuccess onNavigate={handleNavigate} />;
      case 'driver-dashboard':
        return <DriverDashboard onNavigate={handleNavigate} onPriorityUpgrade={handlePriorityUpgrade} />;
      case 'explore-garages':
        return <ExploreGaragesPage onNavigate={handleNavigate} onPriorityUpgrade={handlePriorityUpgrade} />;
      case 'my-searches':
        return <MySearchesPage onNavigate={handleNavigate} />;
      case 'sent-requests':
        return <SentRequestsPage onNavigate={handleNavigate} />;

      // Parker pages
      case 'parker-onboarding':
        return <ParkerOnboarding onNavigate={handleNavigate} />;
      case 'parker-success':
        return <ParkerSuccess onNavigate={handleNavigate} />;
      case 'parker-dashboard':
        return <ParkerDashboard onNavigate={handleNavigate} />;
      case 'my-garages':
        return <MyGaragesPage onNavigate={handleNavigate} action={navigationOptions?.action} />;
      case 'received-requests':
        return <ReceivedRequestsPage onNavigate={handleNavigate} />;

      // Contract pages
      case 'contract-wizard':
        return <ContractWizard onNavigate={handleNavigate} userType={userType} />;
      case 'contract-success':
        return <ContractSuccess onNavigate={handleNavigate} userType={userType} />;
      case 'my-contracts':
        return <MyContractsPage onNavigate={handleNavigate} userType={userType} />;
      case 'cancellation-wizard':
        return <CancellationWizard onNavigate={handleNavigate} userType={userType} />;

      // Profile & settings
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} userType={userType} initialSection={navigationOptions?.profileSection} />;
      case 'cookie-preferences':
        return <CookiePreferences onNavigate={handleNavigate} />;

      // Admin pages
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;

      // Legal pages
      case 'terms':
        return <TermsPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      case 'cookies':
        return <CookiesPage onNavigate={handleNavigate} />;

      // Error pages
      case '404':
        return <NotFoundPage onNavigate={handleNavigate} />;
      case '500':
        return <ServerErrorPage onNavigate={handleNavigate} />;
      case 'maintenance':
        return <MaintenancePage onNavigate={handleNavigate} />;

      default:
        return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  // Check if page requires authentication
  const requiresAuth = [
    'driver-dashboard', 'parker-dashboard', 'profile', 
    'contract-wizard', 'my-contracts', 'cancellation-wizard',
    'explore-garages', 'my-searches', 'sent-requests',
    'my-garages', 'received-requests', 'admin-dashboard'
  ].includes(currentPage);

  // Mock authentication check
  const isAuthenticated = userType !== null;

  // Redirect to login if auth required but not authenticated
  if (requiresAuth && !isAuthenticated && currentPage !== 'login') {
    return <LoginPage onNavigate={handleNavigate} redirectTo={currentPage} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link - first focusable element */}
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>

      {/* Navigation - hidden on certain pages */}
      {!['login', 'register', 'verify-email', 'otp-verification', 'forgot-password', 'reset-password', 'complete-profile', 'account-blocked', 'captcha', 'session-expired', 'auth-demo', 'maintenance', '500'].includes(currentPage) && (
        <Navigation 
          currentPage={currentPage} 
          userType={userType} 
          onNavigate={handleNavigate} 
          breadcrumbs={breadcrumbs}
        />
      )}
      
      {/* Main content */}
      <main id="main-content" role="main">
        {renderCurrentPage()}
      </main>

      {/* Priority Upgrade Modal */}
      {showPriorityModal && (
        <PriorityUpgradeModal
          onClose={handlePriorityUpgradeClose}
          onUpgrade={(success) => handlePriorityUpgradeClose(success)}
        />
      )}
      
      {/* WhatsApp CTA - Global but respecting page-specific rules */}
      {!['login', 'register', 'verify-email', 'otp-verification', 'forgot-password', 'reset-password', 'complete-profile', 'account-blocked', 'captcha', 'session-expired', 'auth-demo', 'maintenance', '500'].includes(currentPage) && (
        <WhatsAppCTA show={true} />
      )}

      {/* Global Toast Container */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--card)',
            color: 'var(--card-foreground)',
            border: '1px solid var(--border)',
          },
        }}
      />



      {/* Global error boundary fallback */}
      <noscript>
        <div className="fixed inset-0 bg-white flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">JavaScript requerido</h1>
            <p className="text-gray-600">
              Parkiduo requiere JavaScript para funcionar correctamente. 
              Por favor, habilita JavaScript en tu navegador.
            </p>
          </div>
        </div>
      </noscript>
    </div>
  );
}