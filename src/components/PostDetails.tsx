import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

type SendDataType = {
  newComment: CommentData,
  setIsButtonLoading: (IsButtonLoading: boolean) => void,
  clearText: () => void,
};

type Props = {
  currentPost: Post;
  postComments: Comment[];
  isCommentLoading: boolean,
  isCommentLoadingError: boolean,
  isNoComments: boolean,
  setIsNewCommentForm: (newCommentForm: boolean) => void,
  isNewCommentForm: boolean,
  addComment: (sendData: SendDataType) => void,
  commentDelete: (commentId: number) => void,
};

export const PostDetails: React.FC<Props> = ({
  currentPost,
  postComments,
  isCommentLoading,
  isCommentLoadingError,
  isNoComments,
  setIsNewCommentForm,
  isNewCommentForm,
  addComment,
  commentDelete,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost.id}: ${currentPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {currentPost.body}
          </p>
        </div>

        <div className="block">
          {!isCommentLoadingError && isCommentLoading && <Loader />}

          {isCommentLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {!isCommentLoadingError && isNoComments
          && postComments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isCommentLoadingError && postComments.length !== 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {postComments.map((comment) => {
                const {
                  id,
                  name,
                  email,
                  body,
                } = comment;

                return (
                  <article
                    key={id}
                    className="message is-small is-loading"
                    data-cy="Comment"
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
                        onClick={() => commentDelete(id)}
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
          )}

          {!isCommentLoadingError && !isNewCommentForm && !isCommentLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsNewCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {!isCommentLoadingError && isNewCommentForm
        && (
          <NewCommentForm
            addComment={addComment}
          />
        )}
      </div>
    </div>
  );
};
