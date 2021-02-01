const BASE_URL = 'https://mate-api.herokuapp.com';

const request = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json())
  .then(result => result.data);

export const getPostComments = async(postId) => {
  const result = await request(`/comments?postId=${postId}`);

  return result;
};

const post = (url, data) => fetch(`${BASE_URL}${url}`, {
  method: 'POST',
  body: JSON.stringify(data),
})
  .then(response => response.json())
  .then(result => result.data);

export const addPostComment = ({
  postId,
  name,
  email,
  body,
}) => post('/comments', {
  postId,
  name,
  email,
  body,
});

export const deletePostComment = postId => fetch(
  `${BASE_URL}/comments/${postId}`, {
    method: 'DELETE',
  },
)
  .then(response => response.json())
  .then(result => result.data);
