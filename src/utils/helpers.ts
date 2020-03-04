import { FullPost } from '../constants/types';

export const getVisiblePosts = (
  posts: FullPost[],
  query: string,
): FullPost[] => {
  return posts.filter(post => {
    return (
      post.title.toLowerCase().includes(query.toLowerCase())
      || post.body.toLowerCase().includes(query.toLowerCase())
    );
  });
};
