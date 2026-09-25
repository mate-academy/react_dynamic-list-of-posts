import { Comment } from '../types/Comment';
import { CommentComponent } from './CommentComponent';

type Props = {
  comments: Comment[];
  handleDelete: (deletedComment: Comment) => void;
};

export const CommentsList = ({
  comments,
  handleDelete: handleDelete,
}: Props) => {
  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map((comment: Comment) => {
        return (
          <CommentComponent
            comment={comment}
            handleClick={(deletedComment: Comment) =>
              handleDelete(deletedComment)
            }
            key={comment.id}
          />
        );
      })}
    </>
  );
};
