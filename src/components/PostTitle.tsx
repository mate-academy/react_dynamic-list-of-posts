import { Post } from '../types/Post';

interface PostTitleProps {
  openedPost: Post;
}
export const PostTitle: React.FC<PostTitleProps> = ({ openedPost }) => {
  return (
    <h2 data-cy="PostTitle">{`#${openedPost.id}: ${openedPost.title}`}</h2>
  );
};
