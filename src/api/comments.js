const BASE_URL = 'https://mate-api.herokuapp.com/comments/';

export async function getPostComments() {
  const response = await fetch(`${BASE_URL}`);

  const result = await response.json();

  return result.data;
}

export async function deletePostComments(url) {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
  });

  const result = response.json();

  return result.data;
}

export async function createPost(name, postId, body, email) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });

  const result = await response.json();

  return result;
}
