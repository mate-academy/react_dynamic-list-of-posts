import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { ErrorType } from '../types/ErrorType';

type Props = {
  selectedPost?: Post,
  isLoading: boolean,
  postComments: Comment[],
  onAddComment: (arg: Comment | null) => void,
  onDeleteComment: (commentId: number) => void,
  errorMessage: ErrorType,
  isFormActive: boolean,
  onSetIsFormActive: (arg: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isLoading,
  postComments,
  errorMessage,
  isFormActive,
  onAddComment,
  onDeleteComment,
  onSetIsFormActive,
}) => (
  <div className="content" data-cy="PostDetails">
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost?.body}
        </p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && errorMessage === ErrorType.LoadingFailed && (
          <div className="notification is-danger" data-cy="CommentsError">
            {errorMessage}
          </div>
        )}

        {!isLoading
          && !postComments.length
          && !errorMessage
          && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

        {!isLoading
          && postComments.length > 0
          && !errorMessage
          && (
            <>
              <p className="title is-4">Comments:</p>

              {postComments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
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
                      onClick={() => onDeleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

        {!isLoading && !isFormActive && !errorMessage && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => onSetIsFormActive(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {!errorMessage && isFormActive && (
        <NewCommentForm
          selectedPostId={selectedPost?.id || 0}
          onAddComment={onAddComment}
        />
      )}
    </div>
  </div>
);
