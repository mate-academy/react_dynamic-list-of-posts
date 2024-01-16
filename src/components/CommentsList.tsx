import { useCommentContext } from '../context/CommentContext';
import { CommentItem } from './CommentItem';
import { Loader } from './Loader';

export const CommentsList = () => {
  const {
    comments,
    commentsAreLoading,
    showCommentsError,
  } = useCommentContext();

  if (commentsAreLoading) {
    return <Loader />;
  }

  if (showCommentsError) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  }

  if (!comments?.length) {
    return (
      <p className="title is-4" data-cy="NoCommentsMessage">
        No comments yet
      </p>
    );
  }

  return (
    <>
      <p className="title is-4">Comments:</p>

      {
        comments && comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      }

    </>
  );
};
