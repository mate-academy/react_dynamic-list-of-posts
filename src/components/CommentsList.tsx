import { FC } from 'react';
import { useAppSelector } from 'hooks/useRedux';
import { selectComments } from 'store/comments/commentsSelectors';
import Loader from './Loader';
import CommentItem from './CommentItem';

const CommentsList:FC = () => {
  const comments = useAppSelector(selectComments);

  if (!comments) {
    return <Loader />;
  }

  if (!comments.length) {
    return (
      <p className="title is-4" data-cy="NoCommentsMessage">
        No comments yet
      </p>
    );
  }

  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentsList;
