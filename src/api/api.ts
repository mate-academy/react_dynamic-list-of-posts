export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url:string, options: Record<string, unknown>) => {
  const response = await fetch(`${BASE_URL}${url}`, options);

  return response.json;
};

export const postMethod = (url:string, data: Record<string, unknown>) => {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};

export const deleteMethod = (url:string) => {
  return request(url, {
    method: 'DELETE',
  });
};
