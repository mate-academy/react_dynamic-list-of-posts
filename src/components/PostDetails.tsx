import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post | null;
  comments: Comment[];
  error: string;
  loading: boolean;
  onDeleteComment: (commentId: number) => void;
  onAddComment: (comment: Comment) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  error,
  loading,
  onDeleteComment,
  onAddComment,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setIsFormOpen(false);
    setSubmitError(null);
  }, [post?.id]);

  if (!post) {
    return null;
  }

  const handleCommentSubmit = async (formData: CommentData): Promise<void> => {
    try {
      setSubmitError(null);
      const newComment = await client.post<Comment>(
        `/posts/${post.id}/comments`,
        {
          ...formData,
          postId: post.id,
        },
      );

      onAddComment(newComment);
    } catch (err) {
      setSubmitError('Failed to add comment');
      throw err;
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {error && (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
          </div>
        )}

        {submitError && (
          <div className="notification is-danger" data-cy="CommentSubmitError">
            {submitError}
          </div>
        )}

        {!loading && !error && comments.length === 0 && (
          <p data-cy="NoCommentsMessage">No comments yet</p>
        )}

        {!loading && !error && comments.length > 0 && (
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

        {!loading && !error && !isFormOpen && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormOpen(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isFormOpen && <NewCommentForm onSubmit={handleCommentSubmit} />}
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      postId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
};
