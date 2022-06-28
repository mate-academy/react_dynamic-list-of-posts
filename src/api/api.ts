export const BASE_URL = 'https://mate.academy/students-api';

type Comment = {
  postId: number;
  name: string,
  email: string,
  body: string,
};

export const createComment = (body: Comment) => {
  fetch('https://mate.academy/students-api/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
  });
};
