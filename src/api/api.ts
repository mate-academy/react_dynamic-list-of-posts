const API_URL = 'https://jsonplaceholder.typicode.com/';

const getData = async (url: string) => {
  const response =  await fetch(url);
  const data = await response.json();

  return data;
};

export const getPrepearedPosts = async (): Promise<PostWithUser[]> => {
  const [
    posts,
    comments,
    users,
  ] = await Promise.all([
    getData(`${API_URL}posts`),
    getData(`${API_URL}comments`),
    getData(`${API_URL}users`),
  ]);

  const PrepearedPosts = posts.map((post: Post) => ({
    ...post,
    user: users.find((user: User) => user.id === post.userId),
    comments: comments.filter((comment: Comment) => comment.postId === post.id),
  }));

  return PrepearedPosts;
};
