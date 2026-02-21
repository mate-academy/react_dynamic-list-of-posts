import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  post: Post;
  comments: Comment[];
  commentsLoading: boolean;
  commentsError: boolean;
  onDelete: (id: number) => void;
  onAdd: (name: string, email: string, body: string) => Promise<void>;
}

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  commentsLoading,
  commentsError,
  onDelete,
  onAdd,
}) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(false);
  }, [post.id]);

  const handleWriteCommentClick = () => {
    setShowForm(true);
  };

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

        {!commentsLoading && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!commentsLoading &&
          !commentsError &&
          comments.map(comment => (
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
                  type="button"
                  className="delete is-small"
                  data-cy="CommentDelete"
                  onClick={() => onDelete(comment.id)}
                />
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

        {!showForm && !commentsLoading && !commentsError && (
          <button
            type="button"
            className="button is-link"
            data-cy="WriteCommentButton"
            onClick={handleWriteCommentClick}
          >
            Write a comment
          </button>
        )}
      </div>

      {showForm && <NewCommentForm postId={post.id} onAdd={onAdd} />}
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired as PropTypes.Validator<Post>,

  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      postId: PropTypes.number.isRequired,
    }),
  ).isRequired as PropTypes.Validator<Comment[]>,

  commentsLoading: PropTypes.bool.isRequired,
  commentsError: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};
