import React, { useContext } from 'react';
import { CommentType } from '../types/CommentType';
import { client } from '../utils/fetchClient';
import { DispatchContext } from '../context/GlobalPostsProvider';

interface Props {
  comment: CommentType;
}

export const Comments: React.FC<Props> = ({ comment }) => {
  const dispatch = useContext(DispatchContext);

  const handleDeleteComment = async () => {
    try {
      dispatch({ type: 'deletedCommentId', deletedCommentId: comment.id });
      await client.delete(`/comments/${comment.id}`);
    } catch (error) {
      throw new Error('Could not delete comment');
    }
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${comment?.email}`} data-cy="CommentAuthor">
          {comment?.name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={handleDeleteComment}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {comment?.body}
      </div>
    </article>
  );
};
