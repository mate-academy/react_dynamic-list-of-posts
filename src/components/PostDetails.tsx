import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [deleteError, setDeleteError] = useState<Comment | null>(null);

  useEffect(() => {
    setIsCommentsLoading(true);
    setIsCommentsError(false);
    setComments([]);
    setIsFormVisible(false);
    setDeleteError(null);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => {
        setIsCommentsError(true);
      })
      .finally(() => {
        setIsCommentsLoading(false);
      });
  }, [post.id]);

  const hasNoComments =
    !isCommentsLoading && !isCommentsError && comments.length === 0;

  const deleteComment = (comment: Comment) => {
    setDeleteError(null);

    setComments(currentComments =>
      currentComments.filter(
        currentComment => currentComment.id !== comment.id,
      ),
    );

    client.delete(`/comments/${comment.id}`).catch(() => {
      setDeleteError(comment);
    });
  };

  const retryDelete = () => {
    if (!deleteError) {
      return;
    }

    const comment = deleteError;

    client
      .delete(`/comments/${comment.id}`)
      .then(() => {
        setDeleteError(null);
      })
      .catch(() => {
        setDeleteError(comment);
      });
  };

  const addComment = (comment: Comment) => {
    setComments(currentComments => [...currentComments, comment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {isCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {deleteError && (
            <div className="notification is-danger">
              Unable to delete comment.
              <button
                type="button"
                className="button is-small is-danger is-light ml-2"
                onClick={retryDelete}
              >
                Retry
              </button>
            </div>
          )}

          {hasNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && <p className="title is-4">Comments:</p>}

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
                  onClick={() => deleteComment(comment)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {!isCommentsLoading && !isCommentsError && !isFormVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormVisible && (
          <NewCommentForm postId={post.id} onAdd={addComment} />
        )}
      </div>
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
