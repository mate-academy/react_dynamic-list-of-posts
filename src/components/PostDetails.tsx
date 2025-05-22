// import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  currentPost: Post;
  isLoadingComments: boolean;
  userComments: CommentData[] | undefined;
  isLoadingCommentsError: boolean;
  isNotHasComments: boolean;
  isButtonShown: boolean;
  isCommentFormShown: boolean;
  setIsCommentFormShown: (formShown: boolean) => void;
  setIsButtonShown: (buttonShown: boolean) => void;
  deleteComment: (commentId: number) => void;
  createComment: (comment: Comment) => Promise<void>;
};

export const PostDetails: React.FC<Props> = ({
  currentPost,
  isLoadingComments,
  userComments,
  isLoadingCommentsError,
  isNotHasComments,
  isButtonShown,
  isCommentFormShown,
  setIsCommentFormShown,
  setIsButtonShown,
  deleteComment,
  createComment,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost?.id}: ${currentPost?.title}`}
          </h2>

          <p data-cy="PostBody">{currentPost?.body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {isLoadingCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isNotHasComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {userComments && userComments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {userComments.map(comment => (
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
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
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

          {isButtonShown && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => {
                setIsCommentFormShown(true);
                setIsButtonShown(false);
              }}
            >
              Write a comment
            </button>
          )}
        </div>

        {isCommentFormShown && (
          <NewCommentForm
            createComment={createComment}
            currentPost={currentPost}
          />
        )}
      </div>
    </div>
  );
};
