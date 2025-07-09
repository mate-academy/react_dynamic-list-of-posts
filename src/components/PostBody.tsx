import { Post } from '../types/Post';

interface PostBodyProps {
  openedPost: Post;
}

export const PostBody: React.FC<PostBodyProps> = ({ openedPost }) => {
  return <p data-cy="PostBody">{openedPost.body}</p>;
};
