import { Comment } from '../types/Comment';
import { CommentInfo } from './CommentInfo';

type Props = {
  comments: Comment[],
  removeComment: (id: number) => void,
};

export const CommentsList: React.FC<Props> = ({
  comments,
  removeComment,
}) => (
  <>
    {comments.map(comment => (
      <CommentInfo
        key={comment.id}
        comment={comment}
        removeComment={removeComment}
      />
    ))}
  </>
);
