import React, { useEffect, useState, useCallback } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';

interface SidebarProps {
  post: Post | null;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ post, onClose }) => {
  const [openCommentForm, setOpenCommentForm] = useState(false);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);
  const [commentsState, setCommentsState] = useState({
    items: [] as Comment[],
    isLoading: false,
    error: '',
  });

  useEffect(() => {
    if (!post || typeof post.id !== 'number' || post.id <= 0) {
      setCommentsState({ items: [], isLoading: false, error: '' });

      return;
    }

    setCommentsState({ items: [], isLoading: true, error: '' });

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(res => {
        setCommentsState({ items: res, isLoading: false, error: '' });
      })
      .catch(() => {
        setCommentsState({
          items: [],
          isLoading: false,
          error: 'Unable to load comments',
        });
      });
  }, [post]);

  useEffect(() => {
    setOpenCommentForm(false);
  }, [post]);

  const handleDelete = useCallback(
    (commentId: number) => {
      const commentToDelete = commentsState.items.find(c => c.id === commentId);

      if (!commentToDelete) {
        return;
      }

      setDeletingIds(prev => [...prev, commentId]);
      setCommentsState(prev => ({
        ...prev,
        items: prev.items.filter(x => x.id !== commentId),
      }));

      client
        .delete(`/comments/${commentId}`)
        .catch(() => {
          setCommentsState(prev => ({
            ...prev,
            items: [...prev.items, commentToDelete].sort((a, b) => a.id - b.id),
            error: 'Failed to delete comment',
          }));
        })
        .finally(() => {
          setDeletingIds(prev => prev.filter(i => i !== commentId));
        });
    },
    [commentsState.items],
  );

  const handleAdd = useCallback((newComment: Comment) => {
    setCommentsState(prev => ({
      ...prev,
      items: [...prev.items, newComment],
    }));
  }, []);

  if (!post) {
    return null;
  }

  // Розбиваємо умови на ультра-короткі рядки, щоб вкластися в 80 символів
  const { isLoading, error, items } = commentsState;
  const showNoComments = !isLoading && !error && items.length === 0;
  const showCommentsList = items.length > 0 && !isLoading;
  const showWriteButton = !openCommentForm && !isLoading && !error;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <button
          className="delete is-pulled-right"
          aria-label="close"
          onClick={onClose}
        />
        <h2 className="title is-4" data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>
      <hr />

      <div className="block">
        <h3 className="title is-5">Comments</h3>

        {isLoading && <Loader />}

        {error && (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
          </div>
        )}

        {showNoComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {showCommentsList && (
          <ul>
            {items.map(comment => (
              <li key={comment.id} data-cy="Comment" className="box">
                <button
                  className="delete is-pulled-right"
                  aria-label="delete"
                  onClick={() => handleDelete(comment.id)}
                  disabled={deletingIds.includes(comment.id)}
                  data-cy="CommentDelete"
                />
                <strong>
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>
                </strong>
                <p data-cy="CommentBody">{comment.body}</p>
              </li>
            ))}
          </ul>
        )}

        {showWriteButton && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setOpenCommentForm(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {openCommentForm && (
        <NewCommentForm selectedPost={post} onAddComment={handleAdd} />
      )}
    </div>
  );
};
