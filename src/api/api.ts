const BASE_URL = 'https://mate.academy/students-api';

export const getRequest = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    return await response.json();
  } catch (error) {
    return null;
  }
};

export const deleteRequest = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });

    return await response.json();
  } catch (error) {
    return null;
  }
};

export const postRequest = async (endpoint: string, body: CommentToPost) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    return null;
  }
};
