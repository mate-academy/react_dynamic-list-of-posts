import { Comment } from '../../types/Comment';
import CommentInfo from './CommentInfo';

type Props = {
  comments: Comment[];
  onClickDeleteComment: (commentId: number) => void;
};

const CommenstList = ({ comments, onClickDeleteComment }: Props) => {
  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => (
        <CommentInfo
          key={comment.id}
          comment={comment}
          onClickDeleteComment={onClickDeleteComment}
        />
      ))}
    </>
  );
};

export default CommenstList;
