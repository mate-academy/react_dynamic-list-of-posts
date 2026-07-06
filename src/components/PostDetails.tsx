import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { getPostComments, deleteComment } from '../utils/api';
import { Comment } from '../types/Comment';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  const handleCommentAdded = (newComment: Comment) => {
    setComments(current => [...current, newComment]);
  };

  useEffect(() => {
    if (!post) {
      return;
    }

    setComments([]);
    setCommentsLoading(true);
    setCommentsError(false);
    setIsCommentVisible(false);

    getPostComments(post.id)
      .then(setComments)
      .catch(() => {
        setCommentsError(true);
      })
      .finally(() => {
        setCommentsLoading(false);
      });
  }, [post]);

  const handleCommentDelete = (commentId: number) => {
    const currentComments = comments;

    setComments(current => current.filter(comment => comment.id !== commentId));

    return deleteComment(commentId).catch(() => {
      setComments(currentComments);
    });
  };

  if (!post) {
    return null;
  }

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

          {!commentsLoading && !commentsError && comments.length > 0 && (
            <p className="title is-4">Comments:</p>
          )}

          {!commentsLoading &&
            !commentsError &&
            comments.map(comment => (
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

          {!commentsLoading && !commentsError && !isCommentVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCommentVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isCommentVisible && (
          <NewCommentForm
            postId={post.id}
            onCommentAdded={handleCommentAdded}
          />
        )}
      </div>
    </div>
  );
};
