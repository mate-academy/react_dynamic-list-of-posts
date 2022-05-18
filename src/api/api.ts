export const BASE_URL = 'https://mate.academy/students-api';

// export const getData = (endpoint: string) => {
//   return fetch(`${BASE_URL}/${endpoint}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error();
//       }

//       return response.json();
//     });
// };

export const getData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);

    return await response.json();
  } catch (error) {
    throw new Error();
  }
};

export const removeData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`,
      {
        method: 'DELETE',
      });

    return await response.json();
  } catch (error) {
    throw new Error();
  }
};
