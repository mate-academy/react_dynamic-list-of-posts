export const getComments = (commentsId: number) => {
  return fetch(`https://mate.academy/students-api/comments?postId=${commentsId}`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });
};

interface Comment {
  postId: number,
  name: string,
  email: string,
  body: string,
}

export const addComment = async (data: Comment) => {
  return fetch('https://mate.academy/students-api/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};

export const removeComment = async (commentId: number) => {
  return fetch(`https://mate.academy/students-api/comments/${commentId}`, { method: 'DELETE' });
};
