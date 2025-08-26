import React from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

interface Props {
  post: Post;
  loading: boolean;
  comments: Comment[] | undefined;
  error: string;
  isWritingComment: boolean;
  setIsWritingComment: (value: boolean) => void;
  onAddComment: (value: Omit<Comment, 'id'>) => Promise<void>;
  onDeleteComment: (value: number) => void;
}

export const PostDetails: React.FC<Props> = ({
  post,
  loading,
  comments,
  error,
  isWritingComment,
  setIsWritingComment,
  onAddComment,
  onDeleteComment,
}) => {
  const handleDelete = (commentId: number) => {
    onDeleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments && comments.length === 0 && !loading && !error && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments && comments.length > 0 && !loading && (
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
                      onClick={() => {
                        handleDelete(comment.id);
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

          {!isWritingComment && !loading && !error && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWritingComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWritingComment && (
          <NewCommentForm postId={post.id} onAddComment={onAddComment} />
        )}
      </div>
    </div>
  );
};
