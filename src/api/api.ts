const BASE_URL = 'https://mate.academy/students-api';

export async function getData<T>(getFrom: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${getFrom}`);

    return await response.json();
  } catch (error) {
    throw new Error(`error ${error}`);
  }
}

export async function removeData<T>(removeFrom: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${removeFrom}`, {
      method: 'DELETE',
    });

    return await response.json();
  } catch (error) {
    throw new Error(`error ${error}`);
  }
}

export async function addData<T>(addTo: string, data: T) {
  const response = await fetch(`${BASE_URL}${addTo}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ ...data }),
  });

  return response.json();
}
