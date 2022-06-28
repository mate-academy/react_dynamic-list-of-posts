export const BASE_URL = 'https://mate.academy/students-api';

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  const response = userId
    ? await fetch(`${BASE_URL}/posts?userId=${userId}`)
    : await fetch(`${BASE_URL}/posts`);

  const posts = await response.json();

  return posts;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`);
  const users = await response.json();

  return users;
};

export const getSelectedPost = async (postId: number): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const post = await response.json();

  return post;
};

export const getComments = async (
  postId: number,
): Promise<CommentWithId[]> => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);
  const comment = await response.json();

  return comment;
};

export const addComments = async (comment: Comment): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const addedComment = await response.json();

  return addedComment;
};

export const removeComment = async (commentId: number) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
  const deletedComment = await response.json();

  return deletedComment;
};
