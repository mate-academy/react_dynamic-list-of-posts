import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  comments: Comment[];
  isLoading: boolean;
  hasError: boolean;
  isFormVisible: boolean;
  onShowForm: () => void;
  onAddComment: (data: CommentData & { postId: number }) => Promise<Comment>;
  onDeleteComment: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  isLoading,
  hasError,
  isFormVisible,
  onShowForm,
  onAddComment,
  onDeleteComment,
}) => {
  const canShowCommentsContent = !isLoading && !hasError;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {canShowCommentsContent && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {canShowCommentsContent && comments.length > 0 && (
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

        {canShowCommentsContent && !isFormVisible && (
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

      {canShowCommentsContent && isFormVisible && (
        <NewCommentForm postId={post.id} onSubmit={onAddComment} />
      )}
    </div>
  );
};
