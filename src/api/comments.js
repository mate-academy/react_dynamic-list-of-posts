const BASE_URL = 'https://mate-api.herokuapp.com';

const request = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json())
  .then(result => result.data);

export const getPostComments = async(postId) => {
  const result = await request(`/comments?postId=${postId}`);

  return result;
};
