import { useContext } from 'react';
import { MainContext } from '../MainContext';
import { CommentItem } from './CommentItem';

export const CommentsList: React.FC = () => {
  const { comments } = useContext(MainContext);

  return (
    <>
      {!!comments.length && <p className="title is-4">Comments:</p>}
      {comments?.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
        />
      ))}
    </>
  );
};
