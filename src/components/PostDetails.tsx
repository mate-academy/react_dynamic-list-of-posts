import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import PropTypes from 'prop-types';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (!post) {
      return;
    }

    setIsFormVisible(false);

    setComments([]);
    setCommentsError(false);
    setIsCommentsLoading(true);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(data => {
        setComments(data);
      })
      .catch(() => {
        setCommentsError(true);
      })
      .finally(() => {
        setIsCommentsLoading(false);
      });
  }, [post]);

  function handleCommentDelete(id: number) {
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== id),
    );
    client.delete(`/comments/${id}`);
  }

  function handleCommentAdd(newComment: Comment) {
    setComments(prev => [...prev, newComment]);
  }

  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      {post && (
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
          <p data-cy="PostBody">{post.body}</p>
        </div>
      )}
      <div className="block">
        {isCommentsLoading && <Loader />}

        {commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isCommentsLoading && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isCommentsLoading && !commentsError && comments.length > 0 && (
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
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}
      </div>
      {!isFormVisible && !isCommentsLoading && !commentsError && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => setIsFormVisible(true)}
        >
          Write a comment
        </button>
      )}
      {isFormVisible && (
        <NewCommentForm onAdd={handleCommentAdd} postId={post?.id || 0} />
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
  }),
};
