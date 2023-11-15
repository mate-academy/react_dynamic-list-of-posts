import React from 'react';
import { Comment } from '../types/Comment';
import { deleteComment } from '../utils/helpers';

type Props = {
  comment: Comment,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
};

export const CommentItem: React.FC<Props> = ({
  comment,
  setComments,
}) => {
  const handleDeleteComment = async (commentId: number) => {
    try {
      const isDeleted = await deleteComment(commentId);

      if (isDeleted) {
        setComments(prev => {
          return prev?.filter(currComment => currComment.id !== commentId);
        });
      }
    } catch {
      // setErrorMessage('Unable to load todos');
      // setTimeout(() => setErrorMessage(''), 3000);
      // throw error;
    }
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
          {comment.name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => handleDeleteComment(comment.id)}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {comment.body}
      </div>
    </article>

  // <article className="message is-small" data-cy="Comment">
  //   <div className="message-header">
  //     <a
  //       href="mailto:misha@mate.academy"
  //       data-cy="CommentAuthor"
  //     >
  //       Misha Hrynko
  //     </a>

  //     <button
  //       data-cy="CommentDelete"
  //       type="button"
  //       className="delete is-small"
  //       aria-label="delete"
  //     >
  //       delete button
  //     </button>
  //   </div>
  //   <div
  //     className="message-body"
  //     data-cy="CommentBody"
  //   >
  //     One more comment
  //   </div>
  // </article>

  // <article className="message is-small" data-cy="Comment">
  //   <div className="message-header">
  //     <a
  //       href="mailto:misha@mate.academy"
  //       data-cy="CommentAuthor"
  //     >
  //       Misha Hrynko
  //     </a>

  //     <button
  //       data-cy="CommentDelete"
  //       type="button"
  //       className="delete is-small"
  //       aria-label="delete"
  //     >
  //       delete button
  //     </button>
  //   </div>

  //   <div className="message-body" data-cy="CommentBody">
  //     {'Multi\nline\ncomment'}
  //   </div>
  // </article>
  );
};
