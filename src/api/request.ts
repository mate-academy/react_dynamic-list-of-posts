export const BASE_URL = 'https://mate.academy/students-api';

export async function request(url: string, options?: {}) {
  try {
    const result = await fetch(`${BASE_URL}${url}`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return response.json();
      });

    return result;
  } catch (error) {
    return {
      Response: 'False',
      Error: `Unexpected error - ${error}`,
    };
  }
}
