import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add a listener for location
content = content.replace("export default function App() {", """
const mapPathToRoute = (path: string): { route: PageRoute; param: string } => {
  if (path === '/') return { route: 'home', param: '' };
  if (path === '/about') return { route: 'about', param: '' };
  if (path === '/services') return { route: 'services', param: '' };
  if (path === '/reviews') return { route: 'reviews', param: '' };
  if (path === '/faq') return { route: 'faq', param: '' };
  if (path === '/book-online') return { route: 'book-online', param: '' };
  if (path === '/contact') return { route: 'contact', param: '' };
  if (path === '/sofa-cleaning') return { route: 'service-sofa', param: 'sofa-cleaning' };
  if (path === '/carpet-cleaning') return { route: 'service-carpet', param: 'carpet-cleaning' };
  if (path === '/upholstery-cleaning') return { route: 'service-upholstery', param: 'upholstery-cleaning' };
  if (path === '/mattress-cleaning') return { route: 'service-mattress', param: 'mattress-cleaning' };
  if (path === '/blind-cleaning') return { route: 'service-blind', param: 'blind-cleaning' };
  if (path === '/rug-cleaning') return { route: 'service-rug', param: 'rug-cleaning' };
  if (path.startsWith('/suburbs/')) return { route: 'suburb-detail', param: path.replace('/suburbs/', '') };
  return { route: 'home', param: '' }; // fallback
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

export default function App() {""")

# Update useEffect
old_use_effect = """  // Dynamically update document title & meta tags for SEO and scroll to top upon page navigation
  useEffect(() => {
    updatePageSeo(currentRoute, routeParam);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute, routeParam]);"""

new_use_effect = """  // Handle initial URL mapping and popstate
  useEffect(() => {
    const handleLocationChange = () => {
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
  }, [currentRoute, routeParam]);"""

content = content.replace(old_use_effect, new_use_effect)

# Update handleNavigate
old_handle_navigate = """  const handleNavigate = (route: PageRoute, param?: string) => {
    setCurrentRoute(route);
    if (param) {
      setRouteParam(param);
    } else if (route.startsWith('service-')) {
      const slug = route.replace('service-', '');
      setRouteParam(slug);
    } else {
      setRouteParam('');
    }
  };"""

new_handle_navigate = """  const handleNavigate = (route: PageRoute, param?: string) => {
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
  };"""

content = content.replace(old_handle_navigate, new_handle_navigate)

# Replace 'service-couch' with 'service-sofa' in switch case
content = content.replace("case 'service-couch':", "case 'service-sofa':")
content = content.replace('serviceSlug="couch-cleaning"', 'serviceSlug="sofa-cleaning"')

# Read URL params for HomePage dynamic service
content = content.replace("""        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );""", """        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
            dynamicServiceId={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('service') : null}
          />
        );""")

with open('src/App.tsx', 'w') as f:
    f.write(content)
