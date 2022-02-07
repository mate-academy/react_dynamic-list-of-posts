export const BASE_URL = 'https://mate.academy/students-api';

export async function getData<T>(url: string, options?: {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, options);

  return response.json();
}

export const remove = (url: string) => {
  return getData(url, { method: 'DELETE' });
};

export const create = async (
  postId: number,
  name: string,
  email: string,
  body: string,
): Promise<Comment> => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });

  return response.json();
};
