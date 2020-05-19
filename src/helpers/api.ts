const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/';

const getDataFromServer = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getPostsData = async (): Promise<PostWithUser[]> => {
  const [
    posts,
    comments,
    users,
  ] = await Promise.all([
    getDataFromServer(`${API_URL}posts.json`),
    getDataFromServer(`${API_URL}comments.json`),
    getDataFromServer(`${API_URL}users.json`),
  ]);

  const PrepearedPosts = posts.map((post: Post) => ({
    ...post,
    user: users.find((user: User) => user.id === post.userId),
    comments: comments.filter((comment: Comment) => comment.postId === post.id),
  }));

  return PrepearedPosts;
};
