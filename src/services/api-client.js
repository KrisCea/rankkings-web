// Cliente HTTP aislado. El resto de la aplicacion no necesita conocer fetch.
import { APP_CONFIG } from '../config/app-config.js';

const buildUrl = (path) => `${APP_CONFIG.apiBaseUrl}/${APP_CONFIG.apiVersion}/${path}`;

const createTimeoutSignal = () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), APP_CONFIG.requestTimeout);
  return { signal: controller.signal, timeoutId };
};

export const createApiClient = () => ({
  async get(path) {
    if (!APP_CONFIG.apiBaseUrl) {
      throw new Error('API no configurada: se esta usando la fuente local.');
    }

    const { signal, timeoutId } = createTimeoutSignal();
    try {
      const response = await fetch(buildUrl(path), {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal
      });

      if (!response.ok) throw new Error(`La API respondio con ${response.status}.`);
      return response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  }
});
