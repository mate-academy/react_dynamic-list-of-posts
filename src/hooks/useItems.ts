import { useState } from 'react';
import { client } from '../utils/fetchClient';
import { CommentData } from '../types/Comment';

export const useItems = <T extends { id : number }>() => {
  const [items, setItems] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleItemsFetch = async (url: string, id: number, msg: string) => {
    setItems(null);
    setErrorMsg('');
    setLoading(true);

    try {
      setItems(await client.get<T[]>(`${url}${id}`));
    } catch {
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleItemPost = async (
    data: CommentData, url: string, msg: string,
  ) => {
    setErrorMsg('');

    try {
      const item: T = await client.post(url, data);

      setItems((prevItems) => {
        if (prevItems) {
          return [...prevItems, item];
        }

        return [item];
      });
    } catch {
      setErrorMsg(msg);
    }
  };

  const handleItemDelete = (
    url: string,
    msg: string,
    id: number,
  ) => {
    setErrorMsg('');

    try {
      client.delete(`${url}${id}`);

      setItems((prevItems) => {
        if (prevItems) {
          return prevItems?.filter((prevItem) => prevItem.id !== id);
        }

        return null;
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
    handleItemDelete,
  };
};
