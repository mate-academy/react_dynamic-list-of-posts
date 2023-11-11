import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  comments: Comment[] | null;
  post: Post | null;
  isCommentsError: boolean;
  isLoadingComments: boolean;
  onDeleteComment: (commentId: number) => void;
  onAddComment: (commentData: CommentData) => void;
  isAddingComment: boolean;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  post,
  isCommentsError,
  isLoadingComments,
  onDeleteComment,
  onAddComment,
  isAddingComment,
}) => {
  const [isDisplayedForm, setIsDisplayedForm] = useState(false);

  const handleDeleteComment = (commentId: number) => {
    onDeleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {isLoadingComments && (
            <Loader />
          )}

          {isCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(!comments?.length && !isLoadingComments && !isCommentsError) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!!comments?.length && (
            <>
              <p className="title is-4">Comments:</p>

              {comments?.map(comment => (
                <article className="message is-small" data-cy="Comment">
                  <div className="message-header">
                    <a
                      href={`mailto:${comment.email}`}
                      data-cy="CommentAuthor"
                    >
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

          {(!isLoadingComments && !isCommentsError && !isDisplayedForm) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsDisplayedForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isDisplayedForm && (
          <NewCommentForm
            onAddComment={onAddComment}
            isAddingComment={isAddingComment}
          />
        )}
      </div>
    </div>
  );
};
