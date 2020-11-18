import { BASE_URL } from './api';

export const getComments = async() => {
  const response = await fetch(`${BASE_URL}/comments`);

  const { data } = await response.json();

  return data;
};
