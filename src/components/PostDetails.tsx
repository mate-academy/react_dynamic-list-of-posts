import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { ErrorType } from '../utils/ErrorType';

interface Props {
  comments: Comment[] | null;
  setComments: (comments: Comment[]) => void;
  error: ErrorType;
  showNewCommentForm: boolean;
  currentPostId: number | null;
  currentPostTitle: string | null;
  currentPostBody: string | null;
  handleOnWriteACommentClick: () => void;
  handleCommentDelete: (id: number) => void;
  post: (
    url: string,
    data: Comment,
  ) => Promise<Comment>;
}

export const PostDetails: React.FC<Props> = ({
  comments,
  setComments,
  currentPostId,
  currentPostTitle,
  currentPostBody,
  error,
  showNewCommentForm,
  handleOnWriteACommentClick,
  handleCommentDelete,
  post,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {currentPostTitle}
          </h2>

          <p data-cy="PostBody">
            {currentPostBody}
          </p>
        </div>

        <div className="block">
          <p className="title is-4">Comments:</p>

          {comments && (
            comments.length ? (
              <>
                {comments.map(({
                  id, name, email, body,
                }: Comment) => (
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
                        onClick={() => id && handleCommentDelete(id)}
                      >
                        delete button
                      </button>
                    </div>
                    <div className="message-body" data-cy="CommentBody">
                      {body}
                    </div>
                  </article>
                ))}
              </>
            ) : (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )
          )}
          {!comments && error === ErrorType.INITIAL && <Loader />}
          {error !== ErrorType.INITIAL && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {!showNewCommentForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleOnWriteACommentClick}
            >
              Write a comment
            </button>
          )}
        </div>

        {showNewCommentForm && (
          <NewCommentForm
            post={post}
            postId={currentPostId}
            comments={comments}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
