const URL_MAIN = 'https://jsonplaceholder.typicode.com/';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${URL_MAIN}${url}`);

  return response.json();
};

const getPosts = (): Promise<Post[]> => {
  return getData('posts');
};

const getUsers = (): Promise<User[]> => {
  return getData('users');
};

const getComments = (): Promise<Comment[]> => {
  return getData('comments');
};

export const getPostsWithUsersAndComments = async (): Promise<PostWithUserAndComment[]> => {
  const posts = await getPosts();
  const users = await getUsers();
  const commentsToPost = await getComments();

  return posts.map((post: Post) => {
    const user = users.find((person: User) => (
      person.id === post.userId)) as User;
    const comments = commentsToPost
      .filter((message: Comment) => (
        message.postId === post.userId)) as Comment[];

    return {
      ...post,
      user,
      comments,
    };
  });
};
