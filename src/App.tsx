import { useState, useEffect, lazy, Suspense } from 'react';
import { PageRoute } from './types';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileBottomBar from './components/layout/MobileBottomBar';
import QuoteModal from './components/ui/QuoteModal';
import WhatsAppButton from './components/ui/WhatsAppButton';
import SteamoraAssistant from './components/ui/SteamoraAssistant';
import ConversionToast from './components/ui/ConversionToast';
import OwnerLeadsModal from './components/ui/OwnerLeadsModal';
import { updatePageSeo } from './utils/seo';

// Route-based Code Splitting via React.lazy for optimized initial load
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const ServiceAreasPage = lazy(() => import('./pages/ServiceAreasPage'));
const SuburbLandingPage = lazy(() => import('./pages/SuburbLandingPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const InquiryPage = lazy(() => import('./pages/InquiryPage'));
const GoogleAdsLandingPage = lazy(() => import('./pages/GoogleAdsLandingPage'));

function PageLoadingFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-teal-500/20 animate-ping" />
        <div className="w-12 h-12 rounded-full border-3 border-teal-500 border-t-transparent animate-spin" />
      </div>
      <p className="text-sm font-medium text-slate-500">Loading experience...</p>
    </div>
  );
}


const mapPathToRoute = (path: string): { route: PageRoute; param: string } => {
  if (path === '/') return { route: 'home', param: '' };
  if (path === '/about') return { route: 'about', param: '' };
  if (path === '/services') return { route: 'services', param: '' };
  if (path === '/reviews') return { route: 'reviews', param: '' };
  if (path === '/faq') return { route: 'faq', param: '' };
  if (path === '/book-online') return { route: 'book-online', param: '' };
  if (path === '/contact') return { route: 'contact', param: '' };
  if (path === '/sofa-cleaning' || path === '/services/sofa-cleaning') return { route: 'service-sofa', param: 'sofa-cleaning' };
  if (path === '/carpet-cleaning' || path === '/services/carpet-cleaning') return { route: 'service-carpet', param: 'carpet-cleaning' };
  if (path === '/upholstery-cleaning' || path === '/services/upholstery-cleaning') return { route: 'service-upholstery', param: 'upholstery-cleaning' };
  if (path === '/mattress-cleaning' || path === '/services/mattress-cleaning') return { route: 'service-mattress', param: 'mattress-cleaning' };
  if (path === '/blind-cleaning' || path === '/services/blind-cleaning') return { route: 'service-blind', param: 'blind-cleaning' };
  if (path === '/rug-cleaning' || path === '/services/rug-cleaning') return { route: 'service-rug', param: 'rug-cleaning' };
  if (path.startsWith('/suburbs/')) return { route: 'suburb-detail', param: path.replace('/suburbs/', '') };
  return { route: 'not-found', param: '' }; // fallback
};

const mapRouteToPath = (route: PageRoute, param?: string): string => {
  if (route === 'home') return '/';
  if (route === 'service-sofa') return '/sofa-cleaning';
  if (route === 'service-carpet') return '/carpet-cleaning';
  if (route === 'service-upholstery') return '/upholstery-cleaning';
  if (route === 'service-mattress') return '/mattress-cleaning';
  if (route === 'service-blind') return '/blind-cleaning';
  if (route === 'service-rug') return '/rug-cleaning';
  if (route === 'suburb-detail' && param) return `/suburbs/${param}`;
  return `/${route}`;
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [routeParam, setRouteParam] = useState<string>('');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isOwnerLeadsOpen, setIsOwnerLeadsOpen] = useState(false);
  const [quoteServiceTarget, setQuoteServiceTarget] = useState<string | undefined>(undefined);

  // Handle initial URL mapping and popstate
  useEffect(() => {
    const handleLocationChange = () => {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('admin') === 'leads' || searchParams.get('leads') === '1' || window.location.hash === '#leads') {
        setIsOwnerLeadsOpen(true);
      }
      const { route, param } = mapPathToRoute(window.location.pathname);
      setCurrentRoute(route);
      setRouteParam(param);
    };

    handleLocationChange(); // Read on mount
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Dynamically update document title & meta tags for SEO and scroll to top upon page navigation
  useEffect(() => {
    updatePageSeo(currentRoute, routeParam);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute, routeParam]);

  const handleNavigate = (route: PageRoute, param?: string) => {
    setCurrentRoute(route);
    let resolvedParam = param || '';
    if (!resolvedParam && route.startsWith('service-')) {
      resolvedParam = route.replace('service-', '') + '-cleaning';
    }
    setRouteParam(resolvedParam);
    
    const newPath = mapRouteToPath(route, resolvedParam);
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  };

  const handleOpenQuoteModal = (service?: string) => {
    let resolvedService = service;
    if (!resolvedService && currentRoute.startsWith('service-')) {
      resolvedService = currentRoute.replace('service-', '') + '-cleaning';
    } else if (!resolvedService && typeof window !== 'undefined') {
      const dynamicService = new URLSearchParams(window.location.search).get('service');
      if (dynamicService) resolvedService = dynamicService;
    }
    setQuoteServiceTarget(resolvedService);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  // Render active page based on routing state
  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
            dynamicServiceId={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('service') : null}
          />
        );

      case 'about':
        return (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );

      case 'services':
        return (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );

      case 'service-carpet':
        return (
          <ServiceDetailPage
            serviceSlug="carpet-cleaning"
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );

      case 'service-sofa':
        return (
          <ServiceDetailPage
            serviceSlug="sofa-cleaning"
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );
      case 'service-upholstery':
        return (
          <ServiceDetailPage
            serviceSlug="upholstery-cleaning"
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );

      case 'service-mattress':
        return (
          <ServiceDetailPage
            serviceSlug="mattress-cleaning"
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );

      case 'service-blind':
        return (
          <ServiceDetailPage
            serviceSlug="blind-cleaning"
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );

      case 'service-rug':
        return (
          <ServiceDetailPage
            serviceSlug="rug-cleaning"
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );

      case 'service-areas':
        return (
          <ServiceAreasPage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );

      case 'suburb-detail':
        return (
          <SuburbLandingPage
            suburbSlug={routeParam || 'carpet-cleaning-richmond'}
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );

      case 'reviews':
        return (
          <ReviewsPage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );

      case 'faq':
        return (
          <FaqPage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );

      case 'book-online':
        return (
          <BookingPage
            onNavigate={handleNavigate}
          />
        );

      case 'inquiry':
        return (
          <InquiryPage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );

      case 'contact':
        return (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );

      case 'google-ads-landing':
        return (
          <GoogleAdsLandingPage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );

      case 'not-found':
        return (
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-slate-600 mb-8 max-w-md">We couldn't find the page you were looking for. Explore our professional cleaning services below.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => handleNavigate('home')} className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl transition-colors">Go Home</button>
              <button onClick={() => handleNavigate('services')} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors">View All Services</button>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 text-left max-w-lg w-full">
              <button onClick={() => handleNavigate('service-carpet')} className="text-teal-600 hover:underline font-semibold">Carpet Cleaning →</button>
              <button onClick={() => handleNavigate('service-sofa')} className="text-teal-600 hover:underline font-semibold">Sofa Cleaning →</button>
              <button onClick={() => handleNavigate('service-upholstery')} className="text-teal-600 hover:underline font-semibold">Upholstery Cleaning →</button>
              <button onClick={() => handleNavigate('service-mattress')} className="text-teal-600 hover:underline font-semibold">Mattress Cleaning →</button>
              <button onClick={() => handleNavigate('service-blind')} className="text-teal-600 hover:underline font-semibold">Blind Cleaning →</button>
            </div>
          </div>
        );
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
            dynamicServiceId={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('service') : null}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-teal-500 selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Main Dynamic View with Suspense for Code-Split Routes */}
      <main className="flex-1">
        <Suspense fallback={<PageLoadingFallback />}>
          {renderCurrentPage()}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuoteModal={handleOpenQuoteModal}
        onOpenOwnerLeads={() => setIsOwnerLeadsOpen(true)}
      />

      {/* Mobile-first bottom sticky CTA bar */}
      <MobileBottomBar
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Global Quick Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        service={quoteServiceTarget}
      />

      {/* Owner Dispatch & Incoming Leads Drawer / Modal */}
      <OwnerLeadsModal
        isOpen={isOwnerLeadsOpen}
        onClose={() => setIsOwnerLeadsOpen(false)}
      />

      {/* WhatsApp Conversion Floating Widget */}
      <WhatsAppButton />

      {/* AI Customer Service & Lead Concierge */}
      <SteamoraAssistant />

      {/* Real-time GA4 / GTM Conversion Toast Inspector */}
      <ConversionToast />
    </div>
  );
}
