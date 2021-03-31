export function requestPosts() {
  return fetch('https://bloggy-api.herokuapp.com/posts')
    .then(response => response.json());
}

export const createPost = ({ title, body }) => (
  fetch(`https://bloggy-api.herokuapp.com/posts`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      title,
      body,
    }),
    redirect: 'follow',
  })
);

export const deletePost = postId => (
  fetch(`https://bloggy-api.herokuapp.com/posts/${postId}`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json' },
  }));

export const updatePost = (postId, title, body) => (
  fetch(`https://bloggy-api.herokuapp.com/posts/${postId}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      title,
      body,
    }),
    redirect: 'follow',
  })
);

export function requestPostsById(postId) {
  return fetch(`https://bloggy-api.herokuapp.com/posts/${postId}`)
    .then(response => response.json());
}

export function createComment(postId, body) {
  if (postId === 0) {
    return;
  }

  return (
    fetch(`https://bloggy-api.herokuapp.com/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId,
        body,
      }),
    })
  );
}
