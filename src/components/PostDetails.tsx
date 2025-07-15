import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { fetchClient } from '../utils/fetchClient';

type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

type Props = {
  post: Post;
  onClose: () => void;
};

export const PostDetails: React.FC<Props> = ({ post, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [hasErrorComments, setHasErrorComments] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    setIsFormOpen(false);

    if (!post) {
      setComments([]);

      return;
    }

    setIsLoadingComments(true);
    setHasErrorComments(false);

    fetchClient
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => setHasErrorComments(true))
      .finally(() => setIsLoadingComments(false));
  }, [post]);

  const handleDelete = (commentId: number) => {
    setDeleteError(null);

    const commentToDelete = comments.find(c => c.id === commentId);

    if (!commentToDelete) {
      return;
    }

    setComments(prev => prev.filter(c => c.id !== commentId));

    fetchClient.delete(`/comments/${commentId}`).catch(() => {
      setComments(prev => [...prev, commentToDelete]);
      setDeleteError('Failed to delete the comment. Please try again.');
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>
        <button
          className="delete"
          aria-label="close"
          onClick={onClose}
          data-cy="ClosePost"
          style={{ float: 'right' }}
        />
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoadingComments && <Loader />}

        {hasErrorComments && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong while loading comments
          </div>
        )}

        {deleteError && (
          <div className="notification is-danger" data-cy="DeleteCommentError">
            {deleteError}
          </div>
        )}

        {!isLoadingComments && !hasErrorComments && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoadingComments && !hasErrorComments && comments.length > 0 && (
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

                <div
                  className="message-body"
                  data-cy="CommentBody"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!isFormOpen && !isLoadingComments && !hasErrorComments && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormOpen(true)}
          >
            Write a comment
          </button>
        )}

        {isFormOpen && post && (
          <NewCommentForm
            postId={post.id}
            onAdd={comment => {
              setComments(prev => [...prev, comment]);
              setDeleteError(null);
            }}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
