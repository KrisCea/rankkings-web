// Composicion de servicios de la aplicacion.
// Este archivo sera el punto de reemplazo cuando se habilite el backend.
import { createContentRepository } from '../repositories/content-repository.js';

export const appServices = Object.freeze({
  contentRepository: createContentRepository()
});
