import { CommentType } from '../../types/Comment';
import { Comment } from '../Comment/Comment';

type Props = {
  comments: CommentType[],
  onDelete: (id: number) => void,
};

export const CommentsList: React.FC<Props> = ({ comments, onDelete }) => {
  return (
    <>
      {
        comments.length ? (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map((comment) => (
              <Comment comment={comment} onDelete={onDelete} />
            ))}
          </>
        ) : (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )
      }
    </>
  );
};
