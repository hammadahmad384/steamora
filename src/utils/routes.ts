import type { PageRoute, ServiceId } from '../types';

export const SERVICE_ROUTES: Record<ServiceId, { route: PageRoute; path: string }> = {
  'carpet-cleaning': { route: 'service-carpet', path: '/carpet-cleaning' },
  'sofa-cleaning': { route: 'service-sofa', path: '/sofa-cleaning' },
  'upholstery-cleaning': { route: 'service-upholstery', path: '/upholstery-cleaning' },
  'mattress-cleaning': { route: 'service-mattress', path: '/mattress-cleaning' },
  'blind-cleaning': { route: 'service-blind', path: '/blind-cleaning' },
  'rug-cleaning': { route: 'service-rug', path: '/rug-cleaning' },
};
