import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Error } from '../types/Error';
import { deleteComment } from '../api';

type Props = {
  post?: Post,
  isLoading: string,
  comments: Comment[],
  onAddComment: (newComment: Comment) => void,
  onDeleteComment: (comments: Comment[]) => void,
  isError: Error,
  formIsActive: boolean,
  onSetFormIsActive: (arg: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  post,
  isLoading,
  comments,
  isError,
  formIsActive,
  onAddComment,
  onDeleteComment,
  onSetFormIsActive,
}) => {
  const handleCommentDelete = (commentId: number) => {
    const filteredComments
      = comments.filter(comment => comment.id !== commentId);

    onDeleteComment(filteredComments);
    deleteComment(commentId)
      .then()
      .catch()
      .finally();
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
          {isLoading === 'comments' && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {isError}
            </div>
          )}

          {!isLoading
            && comments.length === 0
            && isError === Error.NONE
            && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

          {!isLoading
            && comments.length > 0
            && isError === Error.NONE && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
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
                      onClick={() => handleCommentDelete(comment.id)}
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

          {!isLoading && !formIsActive && isError === Error.NONE && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => onSetFormIsActive(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {formIsActive && (
          <NewCommentForm
            postId={post?.id || 0}
            onAddComment={onAddComment}
          />
        )}
      </div>
    </div>
  );
};
