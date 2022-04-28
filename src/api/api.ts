const BASE_URL = 'https://mate.academy/students-api/';

export function getUserPosts(userId: number): Promise<Post[]> {
  return fetch(`${BASE_URL}posts?userId=${userId}`)
    .then(response => response.json());
}

export function getAllPosts(): Promise<Post[]> {
  return fetch(`${BASE_URL}posts`)
    .then(response => response.json());
}

export function getPostDetails(postId: string): Promise<Post> {
  return fetch(`${BASE_URL}posts/${postId}`)
    .then(response => response.json());
}

export function getPostComments(postId: string): Promise<Comment[]> {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => response.json());
}

export function addNewComment(
  name:string,
  email:string,
  text:string,
  selectedPostId:string,
) {
  return fetch(`${BASE_URL}comments`, {
    method: 'POST',
    body: JSON.stringify({
      postId: +selectedPostId,
      name,
      email,
      body: text,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json());
}

export function deleteComment(commentId: string) {
  return fetch(`${BASE_URL}comments/${commentId}`, {
    method: 'DELETE',
  })
    .then(response => response.json());
}
