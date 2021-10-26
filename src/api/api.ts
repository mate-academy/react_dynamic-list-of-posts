export const BASE_URL = 'https://mate.academy/students-api';

export const getPosts = () => (
  fetch(`${BASE_URL}/posts`)
    .then(response => {
      if (!response.ok) {
        return new Error('Can\'t find source');
      }

      return response.json();
    })
);

export const getPostDetails = (postId: string) => (
  fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => {
      if (!response.ok) {
        return new Error('Can\'t find source');
      }

      return response.json();
    })
);

export const getPostComments = (postId: string) => (
  fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) {
        return new Error('Can\'t find source');
      }

      return response.json();
    })
);

export const deleteComment = (commentsId: number) => (
  fetch(`${BASE_URL}/comments/${commentsId}`, {
    method: 'DELETE',
  })
);

export const sendCommentToServer = (newComment: Comment) => (
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
);
