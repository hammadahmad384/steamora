import { useState, useEffect } from 'react';
import { PageRoute } from './types';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileBottomBar from './components/layout/MobileBottomBar';
import QuoteModal from './components/ui/QuoteModal';
import WhatsAppButton from './components/ui/WhatsAppButton';
import SteamoraAssistant from './components/ui/SteamoraAssistant';
import ConversionToast from './components/ui/ConversionToast';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ServiceAreasPage from './pages/ServiceAreasPage';
import SuburbLandingPage from './pages/SuburbLandingPage';
import ReviewsPage from './pages/ReviewsPage';
import FaqPage from './pages/FaqPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import InquiryPage from './pages/InquiryPage';
import GoogleAdsLandingPage from './pages/GoogleAdsLandingPage';
import { updatePageSeo } from './utils/seo';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [routeParam, setRouteParam] = useState<string>('');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteServiceTarget, setQuoteServiceTarget] = useState<string | undefined>(undefined);

  // Dynamically update document title & meta tags for SEO and scroll to top upon page navigation
  useEffect(() => {
    updatePageSeo(currentRoute, routeParam);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute, routeParam]);

  const handleNavigate = (route: PageRoute, param?: string) => {
    setCurrentRoute(route);
    if (param) {
      setRouteParam(param);
    } else if (route.startsWith('service-')) {
      const slug = route.replace('service-', '');
      setRouteParam(slug);
    } else {
      setRouteParam('');
    }
  };

  const handleOpenQuoteModal = (service?: string) => {
    setQuoteServiceTarget(service);
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

      case 'service-couch':
        return (
          <ServiceDetailPage
            serviceSlug="couch-cleaning"
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

      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
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

      {/* Main Dynamic View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuoteModal={handleOpenQuoteModal}
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

      {/* WhatsApp Conversion Floating Widget */}
      <WhatsAppButton />

      {/* AI Customer Service & Lead Concierge */}
      <SteamoraAssistant />

      {/* Real-time GA4 / GTM Conversion Toast Inspector */}
      <ConversionToast />
    </div>
  );
}
