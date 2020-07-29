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

export const loadData = (URL: string) => (
  fetch(URL).then(response => response.json())
);

export const loadPostsWithUsers = async (): Promise<PreparedPosts[]> => {
  const posts = await loadData(API_POSTS);
  const users = await loadData(API_USERS);
  const comments = await loadData(API_COMMENTS);

  return posts.map((post: Post) => (
    {
      ...post,
      user: users.find((user: User) => user.id === post.userId),
      commentList: comments.filter((comment: CommentInteface) => comment.postId === post.id),
    }
  ));
};
