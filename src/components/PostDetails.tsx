import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
  comments: Comment[];
  commentsErrorMessage: string;
  loadingComments: boolean;
  isNewCommentFormOpened: boolean;
  setIsNewCommentFormOpened: (value: boolean) => void;
  onSubmit: (comment: Comment) => void;
  onDelete: (id: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  commentsErrorMessage,
  loadingComments,
  isNewCommentFormOpened,
  setIsNewCommentFormOpened,
  onSubmit,
  onDelete,
}) => {
  const { id, title, body } = selectedPost;

  const isWriteCommentButtonShown =
    !isNewCommentFormOpened && !loadingComments && !commentsErrorMessage;

  const hasNoComments =
    !loadingComments &&
    selectedPost &&
    !comments.length &&
    !commentsErrorMessage;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loadingComments && <Loader />}

          {!loadingComments && commentsErrorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {hasNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>

          {comments.map(comment => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { id, name, email, body } = comment;

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
                    onClick={() => onDelete(id)}
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

          {isWriteCommentButtonShown && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsNewCommentFormOpened(!isNewCommentFormOpened)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isNewCommentFormOpened && (
          <NewCommentForm
            selectedPost={selectedPost}
            onSubmit={onSubmit}
            loadingComments={loadingComments}
          />
        )}
      </div>
    </div>
  );
};
