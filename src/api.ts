const API_URL = 'https://jsonplaceholder.typicode.com/';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

const getUsers = async (): Promise<Users> => {
  return getData<Users>(`${API_URL}users`);
};

const getPosts = async (): Promise<Posts> => {
  return getData<Posts>(`${API_URL}posts`);
};

const getComments = async (): Promise<Comments> => {
  return getData<Comments>(`${API_URL}comments`);
};

export const loadPreparedPosts = async (): Promise<PreparedPosts> => {
  const users: Users = await getUsers();
  const posts: Posts = await getPosts();
  const comments: Comments = await getComments();

  const preparedPost = posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId) as User,
    comments: comments.filter(comment => comment.postId === post.id),
  }));

  return preparedPost;
};
