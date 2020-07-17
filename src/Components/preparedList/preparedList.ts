import { loadData } from '../api/api';
import {
  Post,
  User,
  Comment,
  PreparedPost,
} from '../interfaces/interfaces';
import { URL_POSTS, URL_USERS, URL_COMMENTS } from '../constants/constants';

function newFunction(posts: Post[], users: User[], comments: Comment[]): PreparedPost[] {
  return posts.map((post: Post) => ({
    ...post,
    user: users.find((user: User) => user.id === post.userId) as User,
    comments: comments.filter((comment: Comment) => comment.postId === post.id) as Comment[],
  }));
}

export const getPreparedList = async (): Promise<PreparedPost[]> => {
  const posts = await loadData<Post>(URL_POSTS);
  const users = await loadData<User>(URL_USERS);
  const comments = await loadData<Comment>(URL_COMMENTS);

  return newFunction(posts, users, comments);
};
