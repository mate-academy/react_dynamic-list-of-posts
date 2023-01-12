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
    <ul style={{ marginLeft: 0, marginBottom: '1.5rem', listStyle: 'none' }}>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};

export default CommentsList;
