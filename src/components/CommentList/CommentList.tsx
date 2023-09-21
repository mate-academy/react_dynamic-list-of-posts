import { Comment } from '../../types/Comment';
import { CommentItem } from '../CommentItem';

type Props = {
  comments: Comment[];
};

export const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => (
        <CommentItem comment={comment} key={comment.id} />))}
    </>
  );
};
