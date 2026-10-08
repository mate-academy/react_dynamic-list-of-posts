import { useEffect, useState } from 'react';
import { client } from '../utils/fetchClient';

export function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!url) {
      setData(null);
      setIsLoading(false);
      setHasError(false);

      return;
    }

    let cancelled = false;

    setIsLoading(true);
    setHasError(false);

    client
      .get<T>(url)
      .then(result => {
        if (!cancelled) {
          setData(result);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, isLoading, hasError };
}
