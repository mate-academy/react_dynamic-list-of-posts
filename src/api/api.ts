import { Options } from '../react-app-env';

export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string, options: Options) => {
  return (await fetch(url, options)).json();
};

export const getUsers = async () => {
  return (await fetch(`${BASE_URL}/users`)).json();
};
