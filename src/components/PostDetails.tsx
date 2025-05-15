import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { ErrorMessage } from '../types/ErrorMessage';

type Props = {
  post: Post | null;
  commentsList: Comment[];
  isLoadingPost: boolean;
  errorMessage: ErrorMessage | null;
  inputTitleValue: string;
  inputEmailValue: string;
  bodyComment: string;
  isLoadingAddComment: boolean;
  titleError: boolean;
  emailError: boolean;
  bodyCommentError: boolean;
  writeComment: boolean;
  handleFormComment: () => void;
  handleTitleComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBodyComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmitAddCommentToPost: (e: React.FormEvent<HTMLFormElement>) => void;
  handleClearButton: () => void;
  handleDeleteComment: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  commentsList,
  isLoadingPost,
  errorMessage,
  inputTitleValue,
  inputEmailValue,
  bodyComment,
  isLoadingAddComment,
  titleError,
  emailError,
  bodyCommentError,
  writeComment,
  handleFormComment,
  handleTitleComment,
  handleEmailComment,
  handleBodyComment,
  handleSubmitAddCommentToPost,
  handleClearButton,
  handleDeleteComment,
}) => {
  return (
    <div className="tile is-child box is-success">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>
          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isLoadingPost && <Loader />}

          {!isLoadingPost && errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoadingPost && !errorMessage && commentsList.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoadingPost && !errorMessage && commentsList.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {commentsList.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
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
                      onClick={() => handleDeleteComment(comment.id)}
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

          {!writeComment && !isLoadingPost && !errorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => handleFormComment()}
            >
              Write a comment
            </button>
          )}

          {writeComment && (
            <NewCommentForm
              inputTitleValue={inputTitleValue}
              inputEmailValue={inputEmailValue}
              bodyComment={bodyComment}
              isLoadingAddComment={isLoadingAddComment}
              titleError={titleError}
              emailError={emailError}
              bodyCommentError={bodyCommentError}
              handleTitleComment={handleTitleComment}
              handleEmailComment={handleEmailComment}
              handleBodyComment={handleBodyComment}
              handleSubmitAddCommentToPost={handleSubmitAddCommentToPost}
              handleClearButton={handleClearButton}
            />
          )}
        </div>
      </div>
    </div>
  );
};
