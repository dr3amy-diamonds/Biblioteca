// utils/useFetch.js
import { useState, useEffect } from 'react';

/**
 * Hook personalizado para realizar peticiones HTTP con manejo de estados
 * 
 * @param {string} url - URL del endpoint a consumir
 * @param {object} options - Opciones adicionales (dependencies, initialData, etc.)
 * @returns {object} { data, loading, error, refetch }
 * 
 * Características:
 * - Manejo automático de estados: loading, error, data
 * - Prevención de memory leaks con cleanup
 * - Opción de refetch manual
 * - Compatible con la estructura de respuesta del backend ({ success, data })
 */
const useFetch = (url, options = {}) => {
  const { 
    dependencies = [], 
    initialData = null,
    skip = false // Permite saltar la petición inicial
  } = options;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    if (skip) return;

    let isMounted = true; // Flag para prevenir memory leaks
    const controller = new AbortController(); // Para cancelar peticiones

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        if (isMounted) {
          if (result.success) {
            setData(result.data);
          } else {
            setError(result.message || 'Error desconocido');
          }
        }
      } catch (err) {
        if (isMounted && err.name !== 'AbortError') {
          setError(err.message);
          console.error('Error en useFetch:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, refetchTrigger, skip, ...dependencies]);

  // Función para forzar un refetch manual
  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  return { data, loading, error, refetch };
};

export default useFetch;
