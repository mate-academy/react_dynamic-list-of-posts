const BASE_URL = 'https://mate.academy/students-api';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: object | null = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  const [response] = await Promise.all([
    fetch(BASE_URL + url, options),
    wait(300),
  ]);

  return response.ok
    ? response.json()
    : Promise.reject();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: object | null) => request<T>(url, 'POST', data),
  patch: <T>(url:string, data: object | null) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
