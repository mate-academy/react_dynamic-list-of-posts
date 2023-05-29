import { useState } from 'react';
import { client } from '../utils/fetchClient';

export const useItems = <T>() => {
  const [items, setItems] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleItemsFetch = async (url: string, userId: number, msg: string) => {
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

  const handleItemPost = async (data: any, url: string, msg: string) => {
    setErrorMsg('');

    try {
      const item: T = await client.post(url, data);

      setItems((prevItems): T[] => {
        if (prevItems) {
          return [...prevItems, item];
        }

        return [item];
      });
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
    handleItemPost,
  };
};
