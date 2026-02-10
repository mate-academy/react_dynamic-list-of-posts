import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { comments } from '../utils/fetchComments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  currentPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ currentPost }) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [newCommentIsOpen, setNewCommentIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (!currentPost) {
      setPostComments([]);
      setNewCommentIsOpen(false);

      return;
    }

    setIsLoading(true);
    setError(null);

    comments
      .get<Comment[]>(`/comments?postId=${currentPost.id}`)
      .then(data => {
        setPostComments(data);
      })
      .catch(() => {
        setError('Failed to load comments');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPost]);

  const handleDeleteComment = async (commentId: number) => {
    setDeletingCommentId(commentId);
    try {
      await comments.delete(`/comments/${commentId}`);
      setPostComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      setError('Failed to delete comment');
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost?.id}: ${currentPost?.title}`}
          </h2>

          <p data-cy="PostBody">{currentPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {postComments.length === 0 && !isLoading && !error ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>

              {postComments.map(comment => (
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
                      className={`delete is-small ${deletingCommentId === comment.id ? 'is-loading' : ''}`}
                      aria-label="delete"
                      onClick={() => handleDeleteComment(comment.id)}
                      disabled={deletingCommentId === comment.id}
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

          {!isLoading && !newCommentIsOpen && !error && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setNewCommentIsOpen(!newCommentIsOpen)}
            >
              {newCommentIsOpen ? 'Cancel' : 'Write a comment'}
            </button>
          )}
        </div>

        {newCommentIsOpen && (
          <NewCommentForm
            currentPost={currentPost}
            onAddComment={comment => {
              setPostComments(prev => [comment, ...prev]);
              setNewCommentIsOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
