import { useState, useCallback } from 'react';

export const useApiGetHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRequest = useCallback(async (url, headers = {}) => {
    setLoading(true);
    try {
      headers["Content-Type"] = "application/json";
      const response = await fetch("/api" + url, { method: "GET", headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong :(');
      }

      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);
  return { loading, getRequest, error, clearError };
};