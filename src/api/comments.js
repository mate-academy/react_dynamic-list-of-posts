import { BASE_URL } from './api';

export const getPostComments = async() => {
  const response = await fetch(`${BASE_URL}/comments`);
  const responseJSON = await response.json();
  const { data } = responseJSON;
  const filterData = data.filter(item => item.postId);

  return filterData;
};

export const pushPostComments = newComment => fetch(`${BASE_URL}/comments`, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    ...newComment,
  }),
});

export const deletePostComments
= postId => fetch(`${BASE_URL}/comments/${postId}`, {
  method: 'DELETE',
});
