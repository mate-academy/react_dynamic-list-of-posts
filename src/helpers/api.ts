const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

export const getPosts = (): Promise<Post[]> => {
  return fetch(`${API_URL}/posts.json`)
    .then(response => response.json());
};

export const getUsers = (): Promise<User[]> => {
  return fetch(`${API_URL}/users.json`)
    .then(response => response.json());
};

export const getComments = (): Promise<Comment[]> => {
  return fetch(`${API_URL}/comments.json`)
    .then(response => response.json());
};

export const getPreparedPosts = async (): Promise<Post[]> => {
  const [
    posts,
    users,
    comments,
  ] = await Promise.all([getPosts(), getUsers(), getComments()]);

  return posts.map(post => ({
    ...post,
    user: users.find(currentUser => post.userId === currentUser.id) as User,
    comments: comments.filter(comment => post.id === comment.postId) as Comment[],
  }));
};
