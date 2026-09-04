// Repositorio de contenido: unica puerta de entrada para datos del feed.
import { featuredContent as localFeaturedContent } from '../data/mock-data.js';

export const createContentRepository = ({ apiClient, useRemote = false } = {}) => ({
  async getFeatured() {
    // Activar useRemote cuando el backend tenga listo este endpoint.
    if (useRemote && apiClient) return apiClient.get('content/featured');
    return localFeaturedContent;
  }
});
