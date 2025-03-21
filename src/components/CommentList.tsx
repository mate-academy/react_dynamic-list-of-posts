import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';

type Props = {
  comments: Comment[];
  onDelete: (commentId: number) => void;
};

export const CommentList: React.FC<Props> = ({ comments, onDelete }) => {
  return (
    <>
      {comments.length === 0 ? (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      ) : (
        <>
          <p className="title is-4">Comments:</p>
          {comments.map(comment => (
            <CommentItem
              comment={comment}
              key={comment.id}
              onDelete={onDelete}
            />
          ))}
        </>
      )}
    </>
  );
};
