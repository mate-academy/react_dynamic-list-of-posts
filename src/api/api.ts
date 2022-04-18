export const API_URL = 'https://mate.academy/students-api';

export const request = (
  endpoint: string, options?: RequestInit,
) => {
  return fetch(`${API_URL}/${endpoint}`, options)
    .then(response => response.json())
    .then(response => {
      if (response.Error) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response;
    });
};
