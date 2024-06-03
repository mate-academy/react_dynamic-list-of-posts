import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { deletePostComment, getPostComments } from '../api/comments';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleDeletingComment = (commentId: number) => {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    deletePostComment(commentId).catch(() => {
      setComments(comments);

      setError('Failed to delete comment');
      setTimeout(() => {
        setError('');
      }, 3000);
    });
  };

  useEffect(() => {
    if (!selectedPost.id) {
      return;
    }

    setLoading(true);
    setComments([]);
    setError('');
    setIsFormVisible(false);

    getPostComments(selectedPost.id)
      .then(setComments)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, [selectedPost.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>

        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {error && !loading && (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
          </div>
        )}

        {!comments.length && !loading && !error && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!!comments.length && (
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
                    onClick={() => handleDeletingComment(comment.id)}
                  >
                    ×
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!loading && !isFormVisible && !error && (
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
          <NewCommentForm postId={selectedPost.id} setComments={setComments} />
        )}
      </div>
    </div>
  );
};
