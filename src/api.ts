const URL = 'https://jsonplaceholder.typicode.com';

const getUsersFromServer = () => {
  return fetch(`${URL}/users`)
    .then(data => data.json());
};

const getPostsFromServer = () => {
  return fetch(`${URL}/posts`)
    .then(data => data.json());
};

const getCommentsFromServer = () => {
  return fetch(`${URL}/comments`)
    .then(data => data.json());
};

export const getFullList = async () => {
  const users = await getUsersFromServer().then(data => data);
  const posts = await getPostsFromServer().then(data => data);
  const comments = await getCommentsFromServer().then(data => data);

  return posts.map((item: Post) => {
    return {
      ...item,
      user: users.find((person: User) => person.id === item.userId),
      comments: comments.filter((comment: Comment) => comment.postId === item.id),
    };
  });
};
