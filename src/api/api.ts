export const BASE_URL = 'https://mate.academy/students-api/';

export async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, options);

  return response.json();
}
