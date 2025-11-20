import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Prevent state update on unmounted components

    async function fetchData() {
      try {
        const response = await axios.get<T>(url);
        if (isMounted) {
          setData(response.data);
          setLoading(false);
        }
      } catch (err) {
        const axiosErr = err as AxiosError;
        if (isMounted) {
          setError(axiosErr.message);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false; // cleanup
    };
  }, [url]);

  return { data, loading, error };
}
