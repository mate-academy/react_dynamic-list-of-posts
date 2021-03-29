export const BASE_URL = 'https://mate-api.herokuapp.com';

function getData(url) {
  return fetch(`${BASE_URL}/${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
}

export function getUserPosts(userId) {
  const allPosts = getData('posts');

  return userId
    ? allPosts.then(
      posts => posts.data.filter(post => post.userId === userId),
    )
    : allPosts.then(posts => posts.data);
}

export function getPostDetails(postId) {
  return getData(`posts/${postId}`).then(posts => posts.data);
}

export function getPostComments(postId) {
  return getData('comments').then(
    comments => comments.data.filter(comment => comment.postId === postId),
  );
}

export function deleteComment(commentId) {
  fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    });
}

export function uploadComment(comment) {
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      postId: comment.postId,
      name: comment.name,
      email: comment.email,
      body: comment.body,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  });
}
