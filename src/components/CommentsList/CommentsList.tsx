import {
  FC, memo, useCallback, useContext,
} from 'react';
import { PostsContext } from '../../PostsContext';
import { removePostComment } from '../../api/comments';

export const CommentsList: FC = memo(() => {
  const { postComments, loadComments } = useContext(PostsContext);

  const deleteComment = useCallback(async (commentId: number) => {
    await removePostComment(commentId);
    loadComments();
  }, []);

  return (
    <ul className="PostDetails__list">
      {postComments.map(comment => (
        <li
          className="PostDetails__list-item"
          key={comment.id}
        >
          <button
            type="button"
            className="PostDetails__remove-button button"
            onClick={() => {
              deleteComment(comment.id);
            }}
          >
            X
          </button>
          <p>{comment.body}</p>
        </li>
      ))}
    </ul>
  );
});
