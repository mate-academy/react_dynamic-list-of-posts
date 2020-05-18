const BASE_URL = 'https://jsonplaceholder.typicode.com/';
const POSTS_URL = 'posts';
const USERS_URL = 'users';
const COMMENTS_URL = 'comments';

const getData = <T>(url: string): Promise<T> => {
  return fetch(url)
    .then(response => response.json());
};

const getPosts = (postsUrl: string): Promise<Post[]> => {
  return getData(`${BASE_URL}${postsUrl}`);
};

const getComments = (commentUrl: string): Promise<Comment[]> => {
  return getData(`${BASE_URL}${commentUrl}`);
};

const getUsers = (usersUrl: string): Promise<User[]> => {
  return getData(`${BASE_URL}${usersUrl}`);
};

export const getPrepearedPosts = async (): Promise<PostWithUser[]> => {
  const [
    posts,
    comments,
    users,
  ] = await Promise.all([
    getPosts(POSTS_URL),
    getComments(COMMENTS_URL),
    getUsers(USERS_URL),
  ]);

  const PrepearedPosts = posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId) as User,
    comments: comments.filter(comment => comment.postId === post.id),
  }));

  return PrepearedPosts;
};
