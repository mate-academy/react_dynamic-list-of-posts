export const BASE_URL = 'https://mate.academy/students-api';

export async function request<Type>(url: string): Promise<Type> {
  const response = await fetch(url);

  if (!response.ok) {
    const { status, statusText } = response;

    throw new Error(`${status} - ${statusText}`);
  }

  return response.json();
}
