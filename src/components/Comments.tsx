import React, { useState, useEffect } from 'react';
import { deleteComment, getPostComments } from '../api';
import { Comment } from '../types/Comment';
import { Error } from '../types/Error';
import { Post } from '../types/Post';
import { CommentsList } from './CommentsList';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Notification } from './Notification';

type Props = {
  selectedPost: Post,
};

export const Comments: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [newCommentFormVisible, setNewCommentFormVisible] = useState(false);

  const loadComments = async () => {
    setIsLoading(true);

    try {
      const response = await getPostComments(selectedPost.id);

      setComments(response);
    } catch {
      const newError = {
        message: 'Unable to load comments',
        type: 'LoadingCommentsError',
        isDanger: true,
      };

      setError(newError);
    } finally {
      setIsLoading(false);
    }
  };

  const onCommentAdd = (newComment: Comment) => {
    setComments(prev => {
      if (prev) {
        return [...prev, newComment];
      }

      return null;
    });
  };

  const onCommentDelete = async (id: number) => {
    if (comments) {
      const savedComments = [...comments];

      setComments(prev => {
        if (prev) {
          return prev.filter(comment => comment.id !== id);
        }

        return null;
      });

      try {
        await deleteComment(id);
      } catch {
        const newError = {
          message: 'Unable to delete a comment!',
          type: 'DeleteingCommentError',
          isDanger: true,
        };

        setError(newError);
        setComments([...savedComments]);
      }
    }
  };

  useEffect(() => {
    loadComments();

    return () => setNewCommentFormVisible(false);
  }, [selectedPost]);

  return (
    <div className="block">
      {isLoading && <Loader />}

      {error && (
        <Notification
          error={error}
          setError={setError}
        />
      )}

      {(comments && comments.length) && (
        <CommentsList
          onCommentDelete={onCommentDelete}
          comments={comments}
        />
      )}

      {(comments && !comments.length) && (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      )}

      {(!newCommentFormVisible && comments) && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => setNewCommentFormVisible(prev => !prev)}
        >
          Write a comment
        </button>
      )}

      {newCommentFormVisible && (
        <NewCommentForm
          onCommentAdd={onCommentAdd}
          postId={selectedPost.id}
        />
      )}
    </div>
  );
};
