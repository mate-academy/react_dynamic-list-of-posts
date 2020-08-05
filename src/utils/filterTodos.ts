import { PreparedPost } from '../interfaces';

export const getFilteredPosts = (
  posts: PreparedPost[],
  filter: string,
): PreparedPost[] => {
  const matchedPosts = posts.filter(({ post }) => {
    const { title, body } = post;

    return title.includes(filter) || body.includes(filter);
  });

  return matchedPosts;
};
