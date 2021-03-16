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

export async function createPost(item) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      postId: item.postId,
      name: item.name,
      email: item.email,
      body: item.text,
    }),
  });

  const result = await response.json();

  return result;
}
