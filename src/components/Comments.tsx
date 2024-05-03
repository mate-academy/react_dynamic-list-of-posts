import React, { useState } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { useAppContext } from '../context/store';

export const Comments: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const {
    state: { comments },
    methods: { setComments, deleteComment },
  } = useAppContext();

  const handleDelete = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    deleteComment(commentId);
  };

  return (
    <>
      <p className="title is-4">Comments:</p>
      {comments.map((comment: Comment) => (
        <article
          key={comment.id}
          className="message is-small"
          data-cy="Comment"
        >
          <div className="message-header">
            <a href={`mailto:${comment.email}}`} data-cy="CommentAuthor">
              {comment.name}
            </a>
            <button
              data-cy="CommentDelete"
              type="button"
              className="delete is-small"
              aria-label="delete"
              onClick={() => handleDelete(comment.id)}
            >
              delete button
            </button>
          </div>

          <div className="message-body" data-cy="CommentBody">
            {comment.body}
          </div>
        </article>
      ))}

      {!isFormVisible && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => setIsFormVisible(true)}
        >
          Write a comment
        </button>
      )}
      {isFormVisible && <NewCommentForm />}
    </>
  );
};
