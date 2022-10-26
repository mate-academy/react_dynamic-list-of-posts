import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader } from './Loader';
import { getCommentsById } from '../api/comments';
import { CommentElement } from './CommentElement';

interface Props {
  selectedPost: number | null;
  isSuccess: boolean;
  handleFormDisplay: () => void;
  displayForm: boolean;
}

export const CommentsList: FC<Props> = ({
  selectedPost,
  isSuccess,
  handleFormDisplay,
  displayForm,
}) => {
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery(
    ['comments', selectedPost],
    () => getCommentsById(selectedPost!),
    {
      enabled: isSuccess,
    },
  );

  return (
    <div className="block">
      {isLoading && <Loader />}

      {isError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}

      {(comments && !comments.length) ? (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      ) : (<p className="title is-4">Comments:</p>)}

      {comments && comments
        .map((comment) => (
          <CommentElement key={comment.id} comment={comment} />
        ))}

      {!displayForm && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={handleFormDisplay}
        >
          Write a comment
        </button>
      )}
    </div>
  );
};
