import React from 'react';
import { Comment } from '../types/Comment';
import { removeComment } from '../api/comments';

type Props = {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
};

export const Comments: React.FC<Props> = ({ comments, setComments }) => {
  const deleteComment = async (commentId: number) => {
    setComments(currentComments => currentComments.filter(
      selectedComment => commentId !== selectedComment.id,
    ));
    await removeComment(commentId);
  };

  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => {
        const {
          name,
          id,
          email,
          body,
        } = comment;

        return (
          <article className="message is-small" data-cy="Comment" key={id}>
            <div className="message-header">
              <a href={`mailto:${email}`} data-cy="CommentAuthor">
                {name}
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
                onClick={() => deleteComment(id)}
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {body}
            </div>
          </article>
        );
      })}
    </>
  );
};
