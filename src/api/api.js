export const BASE_URL = 'https://mate-api.herokuapp.com';

export async function request(URL, action = 'GET', content) {
  const params = { method: action };

  if (action === 'POST' && content) {
    params.body = content;
  }

  const result = await fetch(
    `${BASE_URL}${URL}`,
    params,
  );
  const resultData = await result.json();

  return resultData.data;
}
