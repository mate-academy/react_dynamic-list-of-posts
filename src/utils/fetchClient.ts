/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://mate.academy/students-api';

// a promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

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
    .then(() => {
      try {
        // runtime tracer for tests: record any '/posts' requests
        const globalAny: any =
          typeof window !== 'undefined' ? window : globalThis;

        const fullUrl = BASE_URL + url;

        if (
          globalAny &&
          globalAny.__postsCalls &&
          typeof fullUrl === 'string' &&
          fullUrl.indexOf('/posts') !== -1
        ) {
          try {
            globalAny.__postsCalls.push({
              url: fullUrl,
              stack: String(new Error().stack),
              ts: Date.now(),
            });

            // visible in Cypress logs
            // eslint-disable-next-line no-console
            console.warn('[fetchClient tracer] /posts requested:', fullUrl);
            // eslint-disable-next-line no-console
            console.trace();
          } catch (e) {}
        }
      } catch (e) {}

      return fetch(BASE_URL + url, options);
    })
    .then(response => response.json());
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
