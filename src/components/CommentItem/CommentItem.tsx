import { Comment } from '../../types/Comment';
import { deleteComment } from '../../api/comments';

type Props = {
  comment: Comment;
  setCommentsToPost: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const CommentItem: React.FC<Props> = (
  {
    comment, setCommentsToPost,
  },
) => {
  const deleteCommentHandle = () => {
    deleteComment(comment.id)
      .then(res => {
        if (res.ok) {
          setCommentsToPost(prev => {
            return [...prev].filter(el => el.id !== comment.id);
          });
        }
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.warn(`${err.message}`);
      });
  };

  return (
    <li className="PostDetails__list-item">
      <button
        type="button"
        className="PostDetails__remove-button button"
        onClick={() => {
          deleteCommentHandle();
        }}
      >
        X
      </button>
      <p>{comment.body}</p>
    </li>
  );
};
