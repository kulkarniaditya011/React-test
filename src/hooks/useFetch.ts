import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

export function useFetch(url: string) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Your fetchUser logic placed inside the hook
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      const axiosErr = err as AxiosError;
      throw new Error(`Error in getting data: ${axiosErr.message}`);
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetchData()
      .then((fetchedData) => {
        if (isMounted) {
          setData(fetchedData);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
