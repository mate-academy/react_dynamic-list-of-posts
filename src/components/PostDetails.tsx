import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../api/postComments';
import { CommentData, Comment } from '../types/Comment';
import PropTypes from 'prop-types';
type Props = {
  post: Post;
};
export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);


  const loadComments = () => {
    setIsLoading(true);
    setError(false);
    setVisible(false);

    getPostComments(post.id)
      .then(setComments)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(loadComments, [post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    setError(false);
    try {
      const newComment = await createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      setComments(prev => [...prev, newComment]);
    } catch {
      setError(true);
    }
  };

  const deleteTheComment = async (commentId: number) => {
    const backup = comments;

    setComments(current => current.filter(c => c.id !== commentId));
    try {
      await deleteComment(commentId);
    } catch {
      setComments(backup);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}
        {comments.length === 0 && !isLoading && !error && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && comments.length > 0 && !error && (
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
                    onClick={() => deleteTheComment(comment.id)}
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

        {!isLoading && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {!isLoading && !error && visible && (
        <NewCommentForm onSubmit={addComment} />
      )}
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
