import { Comment } from '../types/Comment';
import { CommentObj } from './Comment';

type Props = {
  comments: Comment[];
  onDelete: (id: number) => void;
};

export const CommentList: React.FC<Props> = ({ comments, onDelete }) => {
  return (
    <>
      {comments && comments.length > 0 ? (
        comments.map(comment => {
          return (
            <CommentObj
              key={comment.id}
              comment={comment}
              onDelete={onDelete}
            />
          );
        })
      ) : (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      )}
    </>
  );
};
