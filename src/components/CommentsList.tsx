import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';

type Props = {
  comments: Comment[];
  handleDelete: (id: number) => void;
};

export const CommentsList: React.FC<Props> = ({ comments, handleDelete }) => (
  <>
    {comments.map(comment => (
      <CommentItem comment={comment} handleDelete={handleDelete} />
    ))}
  </>
);
