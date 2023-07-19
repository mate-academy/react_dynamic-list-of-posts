import { FC } from 'react';
import { useCommentsContext } from '../../hooks/useCommentsContext';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import { CommentInfo } from './CommentInfo';

type Props = {
  writingNewPost: boolean;
  onWritingNewPost: (value: boolean) => void;
};

export const CommentList: FC<Props> = (props) => {
  const { writingNewPost, onWritingNewPost } = props;

  const { error } = useGlobalContext();
  const { comments } = useCommentsContext();

  return (
    <>
      {(comments.length > 0 && !error) && (
        <p className="title is-4">Comments:</p>
      )}

      {(comments.length === 0 && !error) && (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      )}

      {comments.map((comment) => (
        <CommentInfo comment={comment} key={comment.id} />
      ))}

      {(!writingNewPost && (!error || comments.length > 0)) && (
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
