import { FC } from 'react';
import { CommentItem } from './CommentItem';
import { NewCommentForm } from './NewCommentForm';
import { useComments } from '../../hooks/useComments';
import { Loader } from '../Loader';

type Props = {
  postId: number;
};

export const CommentsList: FC<Props> = ({ postId }) => {
  const { data: comments, isLoading, isError } = useComments(postId);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <p className="title is-4" data-cy="NoCommentsMessage">
        No comments yet
      </p>
    );
  }

  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}

      <button
        data-cy="WriteCommentButton"
        type="button"
        className="button is-link"
      >
        Write a comment
      </button>
      <NewCommentForm />
    </>
  );
};
