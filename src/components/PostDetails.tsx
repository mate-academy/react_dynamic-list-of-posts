import React from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post,
  comments: Comment[],
  isLoader: boolean,
  isFormVisable: boolean,
  handleFormVisability: (boolean: boolean) => void,
  handleCommentAdd: (author: string, email: string, comment: string) => void,
  isCommentAdding: boolean,
  handleCommentDelete: (commentId: number) => void,
  commentsLoadingError: boolean,
  commentAddError: boolean,
  commentDeleteError: boolean,
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  isLoader,
  isFormVisable,
  handleFormVisability,
  handleCommentAdd,
  isCommentAdding,
  handleCommentDelete,
  commentsLoadingError,
  commentAddError,
  commentDeleteError,
}) => {
  const { id, body, title } = post;

  const hasComments = Boolean(comments.length && !isLoader);
  const hasNoComments = Boolean(!comments.length && !isLoader);
  const isButtonVisbale = !isFormVisable && !isLoader;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        {isLoader && <Loader />}

        {commentsLoadingError && (
          <div
            className="notification is-danger"
            data-cy="CommentsError"
          >
            Something went wrong
          </div>
        )}

        {commentAddError && (
          <div
            className="notification is-danger"
            data-cy="CommentsError"
          >
            Unable to add a todo
          </div>
        )}

        {commentDeleteError && (
          <div
            className="notification is-danger"
            data-cy="CommentsError"
          >
            Unable to delete a todo
          </div>
        )}

        {hasComments && (
          <div className="block">
            <p className="title is-4">Comments:</p>

            {comments.map((comment) => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a
                    href="mailto:misha@mate.academy"
                    data-cy="CommentAuthor"
                  >
                    {comment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => {
                      handleCommentDelete(comment.id);
                    }}
                  >
                    delete button
                  </button>
                </div>

                <div
                  className="message-body"
                  data-cy="CommentBody"
                >
                  {comment.body}
                </div>
              </article>
            ))}
          </div>
        )}

        {hasNoComments && (
          <p
            className="title is-4"
            data-cy="NoCommentsMessage"
          >
            No comments yet
          </p>
        )}
        {isButtonVisbale && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => {
              handleFormVisability(true);
            }}
          >
            Write a comment
          </button>
        )}

        {isFormVisable && (
          <NewCommentForm
            handleCommentAdd={handleCommentAdd}
            isCommentAdding={isCommentAdding}
          />
        )}
      </div>

      {/* <NewCommentForm /> */}
    </div>
  );
};
