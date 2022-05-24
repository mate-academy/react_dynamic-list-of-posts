const BASE_URL = 'https://mate.academy/students-api';

export const getRequest = async (bodyRequest: string) => {
  const response = await fetch(`${BASE_URL}${bodyRequest}`);

  if (!response.ok) {
    throw new Error(`${response.status}| ${response.text}`);
  }

  return response.json();
};

export const postRequest = async (bodyRequest: string, objInJSON: string) => {
  await fetch(`${BASE_URL}${bodyRequest}`, {
    method: 'POST',
    body: objInJSON,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteRequest = async (bodyRequest: string) => {
  await fetch(`${BASE_URL}${bodyRequest}`, {
    method: 'DELETE',
  });
};
