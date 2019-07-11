const API_URL = 'https://jsonplaceholder.typicode.com/';

export default async(value) => {
  const response = await fetch(`${API_URL}${value}`);

  if (!response.ok) {
    throw new Error(`Error code: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
