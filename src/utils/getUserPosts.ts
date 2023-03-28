import { Post } from '../types';

export const getUserPosts = (
  posts: Post[],
  userId: string | undefined,
): Post[] => {
  const idNumber = Number(userId?.slice(userId?.indexOf('-') + 1)) || 0;

  return posts.filter(post => {
    return post.userId === idNumber;
  });
};
