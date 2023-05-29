import { useState } from 'react';
import { client } from '../utils/fetchClient';

export const useItems = <T>(url: string) => {
  const [items, setItems] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleItemsFetch = async (msg: string, userId: number) => {
    setItems(null);
    setErrorMsg('');
    setLoading(true);

    try {
      setItems(await client.get(`${url}${userId}`));

      setLoading(false);
    } catch {
      setErrorMsg(msg);
    }
  };

  return {
    items,
    loading,
    errorMsg,
    handleItemsFetch,
    setErrorMsg,
    setLoading,
  };
};
