import { useContext } from 'react';
import { PostsContext } from '../../PostsContext';
import { CommentItem } from './CommentItem';

export const CommentsList: React.FC = () => {
  const { comments } = useContext(PostsContext);

  return (
    <>
      {comments.length > 0 && <p className="title is-4">Comments:</p>}
      {comments?.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
        />
      ))}
    </>
  );
};
