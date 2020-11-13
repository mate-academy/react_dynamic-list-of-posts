const BASE_URL = 'https://mate-api.herokuapp.com';

export async function request(url, options) {
  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const result = await response.json();

  return result.data;
}

export const getPostComments = async(postId) => {
  const comments = await request('/comments');
  const postComments = comments.filter(comment => comment.postId === postId);

  return postComments;
};

export const post = (url, data) => request(url, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(data),
});

export const createComment = async(postId, name, email, body) => post(
  '/comments', {
    postId,
    name,
    email,
    body,
  },
);
