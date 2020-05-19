import { ensure } from './utils/helpers';

const POSTS_API = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/posts.json';
const USERS_API = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/users.json';
const COMMENTS_API = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/comments.json';

const posts = fetch(POSTS_API).then((response): Promise<Post[]> => (
  response.json()
    .then(data => data)
));

const users = fetch(USERS_API).then((response): Promise<User[]> => (
  response.json()
    .then(data => data)
));

const comments = fetch(COMMENTS_API).then((response): Promise<Comment[]> => (
  response.json()
    .then(data => data)
));

export const postsFromServer = Promise.all([posts, users, comments])
  .then(result => {
    console.log(result);

    return result[0].map(post => (
      {
        ...post,
        user: ensure(result[1].find(user => user.id === post.userId)),
        comments: result[2].filter(comment => comment.postId === post.id),
      }
    ));
  });
