import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

interface Props {
  post: Post;
  comments: Comment[];

  commentsLoading: boolean;
  commentsError: boolean;
  addCommentError: boolean;

  showCommentForm: boolean;

  onShowForm: () => void;

  onAddComment: (data: CommentData) => Promise<void>;

  onDeleteComment: (commentId: number) => void;
}

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  commentsLoading,
  commentsError,
  addCommentError,
  showCommentForm,
  onShowForm,
  onAddComment,
  onDeleteComment,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {commentsLoading && <Loader />}

        {!commentsLoading && commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {addCommentError && (
          <div className="notification is-danger">
            Failed to add comment. Please try again.
          </div>
        )}

        {!commentsLoading && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!commentsLoading && !commentsError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
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

        {!commentsLoading && !commentsError && !showCommentForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={onShowForm}
          >
            Write a comment
          </button>
        )}
      </div>

      {showCommentForm && <NewCommentForm onSubmit={onAddComment} />}
    </div>
  );
};
