export const BASE_URL = 'https://mate-api.herokuapp.com';

export function loadPosts() {
  return fetch(`${BASE_URL}/posts`)
    .then(response => response.json())
    .then(response => response.data)
}

export function getUserPosts(userId) {
  return fetch(`${BASE_URL}/posts/${userId}`)
    .then(response => response.json())
}

export function getPostDetails(postId) {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json())
}

export function getPostComments(postId) {
  return fetch(`${BASE_URL}/comments/`)
    .then(response => response.json())
    .then(comments => comments.data.filter(comment => comment.postId === postId))
}

export function removeComment(commentId) {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
    .then(res => res.json())
}

export function addComment(comment) {
  return fetch(`${BASE_URL}/comments/`, {
     method: 'POST',
     body: JSON.stringify(comment) 
  })
    .then(res => res.json())
}