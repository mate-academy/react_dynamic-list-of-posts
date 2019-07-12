const API_URL = 'https://jsonplaceholder.typicode.com/';

export const getUsers = async() => {
  const response = await fetch(`${API_URL}users`);

  if (!response.ok) {
    throw new Error(`Error code: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getComments = async() => {
  const response = await fetch(`${API_URL}comments`);

  if (!response.ok) {
    throw new Error(`Error code: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getPosts = async() => {
  const response = await fetch(`${API_URL}posts`);

  if (!response.ok) {
    throw new Error(`Error code: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
