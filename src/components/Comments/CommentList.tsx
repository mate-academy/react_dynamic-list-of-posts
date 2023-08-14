import { FC } from 'react';
import { useGlobalContext, useCommentsContext } from '../../hooks';
import { CommentInfo } from './CommentInfo';

type Props = {
  writingNewPost: boolean;
  onWritingNewPost: (value: boolean) => void;
};

export const CommentList: FC<Props> = (props) => {
  const { writingNewPost, onWritingNewPost } = props;

  const { error } = useGlobalContext();
  const { comments } = useCommentsContext();

  const noError = !error;
  const commentsExist = comments.length;

  const noComments = !commentsExist && noError;
  const canAddNewComment = !writingNewPost && (noError || commentsExist);

  return (
    <>
      {noComments ? (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      ) : (
        <p className="title is-4">Comments:</p>
      )}

      {comments.map((comment) => (
        <CommentInfo comment={comment} key={comment.id} />
      ))}

      {canAddNewComment && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => onWritingNewPost(true)}
        >
          Write a comment
        </button>
      )}
    </>
  );
};
