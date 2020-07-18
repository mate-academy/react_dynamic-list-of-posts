import {
  CompletePost, Post, User, Comment,
} from './interfaces';

const API_POSTS = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/posts.json';
const API_USERS = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/users.json';
const API_COMMENTS = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/comments.json';

const fetchData = async (url: string) => {
  const data = await fetch(url).then(response => response.json());

  return data;
};

export const getData = async (): Promise<CompletePost[]> => {
  const posts: Post[] = await fetchData(API_POSTS);
  const users: User[] = await fetchData(API_USERS);
  const comments: Comment[] = await fetchData(API_COMMENTS);

  return posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId) as User,
    comments: comments.filter(comment => comment.postId === post.id),
  }));
};
