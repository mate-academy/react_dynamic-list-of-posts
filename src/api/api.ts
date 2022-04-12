export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string, body = {}, baseUrl = BASE_URL) => fetch(`${baseUrl}${url}`, body)
  .then(response => response.json());

export const remove = (url: string) => request(url, { method: 'DELETE' });

export const post = <T>(url: string, body: T) => request(url, {
  method: 'POST',
  body: JSON.stringify(body),
});
