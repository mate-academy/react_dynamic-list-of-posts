export const BASE_URL = 'https://mate.academy/students-api/';

export async function getData<T>(url: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`);

  return response.json();
}
