const API_URL = 'https://jsonplaceholder.typicode.com';

const getData = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

const getUsers = async (): Promise<Users> => {
  return getData(`${API_URL}/users`);
};

const getPosts = async (): Promise<Posts> => {
  return getData(`${API_URL}/posts`);
};

const getComments = async (): Promise<Comments> => {
  return getData(`${API_URL}/comments`);
};

export const preparedPosts = async () => {
  const users: Users = await getUsers();
  const posts: Posts = await getPosts();
  const comments: Comments = await getComments();

  return (
    posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId) as User,
      comments: comments.filter(comment => comment.id === post.id),
    }))
  );
};
