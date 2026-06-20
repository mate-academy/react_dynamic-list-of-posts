import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api';
import { getCommentsByPost } from '../api';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleDelete = (commentId: number) => {
    const currentComments = [...comments];

    setComments(prev => prev.filter(comment => comment.id !== commentId));

    deleteComment(commentId).catch(() => {
      setComments(currentComments);
      setDeleteError(true);
    });
  };

  useEffect(() => {
    setLoading(true);
    setLoadError(false);
    setDeleteError(false);
    setIsFormVisible(false);

    getCommentsByPost(post.id)
      .then(setComments)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, [post.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {loadError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !loadError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {deleteError && (
          <div className="notification is-danger">
            Unable to delete comment. Try again.
          </div>
        )}

        {!loading && !loadError && comments.length > 0 && (
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
                    onClick={() => handleDelete(comment.id)}
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!loading && !loadError && !isFormVisible && (
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
        <NewCommentForm
          postId={post.id}
          onAddComment={comment => setComments(prev => [...prev, comment])}
        />
      )}
    </div>
  );
};
