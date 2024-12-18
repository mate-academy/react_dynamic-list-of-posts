import { client } from '../utils/fetchClient';

export const getData = async <T>(url: string) => {
  try {
    const data = await client.get<T[]>(url);

    return data;
  } catch (error) {
    throw new Error('Unable to load data');
  }
};
