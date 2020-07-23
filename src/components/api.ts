import
{
  User,
  Post,
  CommentInteface,
  PreparedPosts,
} from './types';

const API_POSTS = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/posts.json';
const API_USERS = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/users.json';
const API_COMMENTS = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/comments.json';

export const loadPosts = (): Promise<Post[]> => (
  fetch(API_POSTS).then(response => response.json())
);

export const loadUsers = (): Promise<User[]> => (
  fetch(API_USERS).then(response => response.json()));

export const loadComments = (): Promise<CommentInteface[]> => (
  fetch(API_COMMENTS).then(response => response.json())
);

export const loadPostsWithUsers = async (): Promise<PreparedPosts[]> => {
  const posts = await loadPosts();
  const users = await loadUsers();
  const comments = await loadComments();

  return posts.map(post => (
    {
      ...post,
      user: users.find(user => user.id === post.userId),
      commentList: comments.filter(comment => comment.postId === post.id),
    }
  ));
};
