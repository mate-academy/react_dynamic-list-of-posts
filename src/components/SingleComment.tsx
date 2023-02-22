import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  comment: Comment,
  comments: Comment[],
  postComments: Comment[],
  setComments: (value: Comment[])=> void,
  setPostComments: (value: Comment[])=> void,
  setIsError: (value: boolean)=> void,
};

export const SingleComment:React.FC<Props> = ({
  comment,
  comments,
  setComments,
  postComments,
  setPostComments,
  setIsError,
}) => {
  const {
    id, email, name, body,
  } = comment;

  const deleteComment = async (singleComment: Comment) => {
    try {
      const response = client.delete(`/comments/${singleComment.id}`);
      const result = await response;

      if (result === 1) {
        setComments(comments.filter(
          (one: Comment) => one.id !== singleComment.id,
        ));
        setPostComments(postComments.filter(
          (one: Comment) => one.id !== singleComment.id,
        ));
        setIsError(false);

        return;
      }
    } catch (error) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      if (error) {
        throw new Error(String(error));
      }
    }
  };

  return (
    <article
      key={id}
      className="message is-small"
      data-cy="Comment"
    >
      <div className="message-header">
        <a
          href={`mailto:${email}`}
          data-cy="CommentAuthor"
        >
          {name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => {
            deleteComment(comment);
          }}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {body}
      </div>
    </article>
  );
};
