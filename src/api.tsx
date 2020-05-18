const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

const getDataFromServer = async (url: string) => {
  const response = await fetch(url);

  return response.json();
};

export const getPostsData = async () => {
  const [posts, users, comments] = await Promise.all([
    getDataFromServer(POSTS_URL),
    getDataFromServer(USERS_URL),
    getDataFromServer(COMMENTS_URL),
  ]);

  const preparedPosts = posts.map((post: Post) => (
    {
      ...post,
      user: users.find((person: User) => (person.id === post.userId)),
      comments: comments.filter((comment: Comment) => (comment.postId === post.id)),
    }));

  return preparedPosts;
};
