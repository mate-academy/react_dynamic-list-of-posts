import { Post, User } from '../../types';
import { getUserPosts } from '../../utils/posts';

type PostService = {
  getUserPosts: (user: User) => Promise<Post[]>;
};

const realPostService: PostService = {
  getUserPosts: user => getUserPosts(user.id),
};

export const postsService = realPostService;
