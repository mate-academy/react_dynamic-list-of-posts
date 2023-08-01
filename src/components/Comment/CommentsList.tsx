import React, { useCallback, useContext } from 'react';
import { Comment } from '../../types/Comment';
import { DispatchContext } from '../../reducer/store';
import { commentService } from '../../services/comment.service';

type Props = {
  comments: Comment[]
};

export const CommentsList: React.FC<Props> = ({ comments }) => {
  const dispatch = useContext(DispatchContext);

  const onDeleteButton = useCallback((id: number) => () => {
    const { removeComment } = commentService(dispatch, comments);

    removeComment(id);
  }, [comments]);

  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => {
        return (
          <article
            key={comment.id}
            className="message is-small"
            data-cy="Comment"
          >
            <div className="message-header">
              <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                {comment.name}
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
                onClick={onDeleteButton(comment.id)}
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </article>
        );
      })}
    </>
  );
};
