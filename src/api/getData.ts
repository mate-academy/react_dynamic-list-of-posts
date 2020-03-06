import {
  POSTS, COMMENTS, USERS, URL,
} from './constants';

async function getData <T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getPosts = (): Promise<PostInterface[]> => {
  return getData(URL + POSTS);
};

export const getComments = (): Promise<CommentInterface[]> => {
  return getData(URL + COMMENTS);
};

export const getUsers = (): Promise<UserInterface[]> => {
  return getData(URL + USERS);
};

export const getPreparedPosts = async (): Promise<PreparedPostInterface[]> => {
  const [
    postsFromServer,
    usersFromServer,
    commentsFromServer,
  ]
    = await Promise.all([
      getPosts(),
      getUsers(),
      getComments(),
    ]);

  return postsFromServer.map(post => ({
    ...post,
    user: usersFromServer.find(user => user.id === post.userId) as UserInterface,
    comments: commentsFromServer.filter(comment => comment.postId === post.id),
  }));
};
