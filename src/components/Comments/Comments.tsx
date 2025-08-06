import { useContext } from 'react';
import { CommentItem } from '../CommentItem';
import { CommentsContext } from '../../Context/CommentsContext';

export const Comments: React.FC = () => {
  const { commentList } = useContext(CommentsContext);

  return (
    <>
      <p className="title is-4">Comments:</p>
      {commentList.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
};
