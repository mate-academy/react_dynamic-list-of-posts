import { FC, useContext } from 'react';
import { CommentsContext } from '../../../../../CommentsProvider';

export const PostComments: FC = () => {
  const { comments } = useContext(CommentsContext);

  return (
    <>
      {comments && <p className="title is-4">Comments:</p>}

      {comments && comments.map(comment => {
        const {
          id, email, body, name,
        } = comment;

        return (
          <article
            className="message is-small"
            data-cy="Comment"
            key={id}
          >
            <div className="message-header">
              <a href={`mailto:${email}`} data-cy="CommentAuthor">
                {name}
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
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
