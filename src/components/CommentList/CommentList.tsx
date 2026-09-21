import { Comment as CommentType } from '../../types/Comment';
import { CommentItem } from '../CommentItem/CommentItem';

type Props = {
  comments: CommentType[];
  onCommentDelete: (commentId: number) => void;
};

export const CommentList = ({ comments, onCommentDelete }: Props) => {
  return (
    <>
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onCommentDelete={onCommentDelete}
        />
      ))}
    </>
  );
};
