const BASE_URL = 'https://mate-api.herokuapp.com';

export async function getUserPosts(userId) {
  const posts = await fetch(`${BASE_URL}/posts`)
    .then(response => response.json())
    .then(result => result.data);

  if (userId === 0) {
    return posts;
  }

  return posts.filter(post => post.userId === userId);
}

export async function getPostDetails(postId) {
  const data = await fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json())
    .then(result => result.data);

  return data;
}

export async function getPostComments(postId) {
  const comments = await fetch(`${BASE_URL}/comments`)
    .then(response => response.json())
    .then(result => result.data);

  return comments.filter(comment => comment.postId === postId);
}

export async function deletePostComment(commentId) {
  const url = `${BASE_URL}/comments/${commentId}`;
  const options = {
    method: 'DELETE',
  };

  const comments = await fetch(url, options)
    .then(response => response.json());

  return comments;
}

export async function addPostComment({
  postId,
  name,
  email,
  body,
}) {
  const url = `${BASE_URL}/comments`;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  };

  const comments = await fetch(url, options)
    .then(response => response.json());

  return comments;
}
