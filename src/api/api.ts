import {
  PostInterface,
  UserInterface,
  CommentInterface,
  PostListInterface,
} from '../interfaces';

const API_URL_POSTS = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/posts.json';
const API_URL_USERS = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/users.json';
const API_URL_COMMENTS = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/comments.json';

const getData = async <T>(url: string): Promise<T[]> => {
  const response = await fetch(url).then(respond => respond.json());

  return response;
};

export const getPrepearedPosts = async (): Promise<PostListInterface[]> => {
  const [posts, users, comments] = await Promise.all(
    [getData<PostInterface>(API_URL_POSTS),
      getData<UserInterface>(API_URL_USERS),
      getData<CommentInterface>(API_URL_COMMENTS)],
  );

  return posts.map(post => ({
    ...post,
    user: users.find(person => person.id === post.userId) as UserInterface,
    comments: comments.filter(comment => comment.postId === post.id) as CommentInterface[],
  }));
};
