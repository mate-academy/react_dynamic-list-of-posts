import React from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  post: Post;
  comments: Comment[];
  isLoadingComments: boolean;
  commentsError: boolean;
  showCommentForm: boolean;
  onToggleCommentForm: () => void;
  onAddComment: (comment: Omit<Comment, 'id' | 'postId'>) => Promise<void>;
  onDeleteComment: (commentId: number) => void;
  isSubmittingComment: boolean;
}

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  isLoadingComments,
  commentsError,
  showCommentForm,
  onToggleCommentForm,
  onAddComment,
  onDeleteComment,
  isSubmittingComment,
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
        {isLoadingComments && <Loader />}

        {commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoadingComments && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoadingComments && comments.length > 0 && (
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
                  />
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!isLoadingComments && !commentsError && !showCommentForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={onToggleCommentForm}
          >
            Write a comment
          </button>
        )}
      </div>

      {showCommentForm && (
        <NewCommentForm
          onSubmit={onAddComment}
          onCancel={onToggleCommentForm}
          isSubmitting={isSubmittingComment}
        />
      )}
    </div>
  );
};
