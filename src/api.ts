const POST_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/posts.json';
const USER_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/users.json';
const COMMENTS_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/comments.json';

export const getPost = async () => (
  fetch(POST_URL)
    .then(response => response.json())
);

export const getUser = async () => (
  fetch(USER_URL)
    .then(response => response.json())
);

export const getComments = async () => (
  fetch(COMMENTS_URL)
    .then(response => response.json())
);
