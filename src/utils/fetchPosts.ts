const BASE_URL = 'https://mate.academy/students-api';

/* eslint-disable @typescript-eslint/no-explicit-any */

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null, // we can send any data to the server
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    // We add body and Content-Type only for the requests with data
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // for a demo purpose we emulate a delay to see if Loaders work
  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    });
}

export const posts = {
  get: <T>(url: string) => request<T>(url),
};
