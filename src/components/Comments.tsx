import { useContext } from 'react';
import { PostsContext } from '../services/Store';
import { CommentItem } from './CommentItem';

export const Comments: React.FC = () => {
  const { comments } = useContext(PostsContext);

  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </>
  );
};
