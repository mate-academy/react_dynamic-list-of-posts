import React, { useState, useEffect } from 'react';
import { deleteComment, getPostComments } from '../api';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { CommentsList } from './CommentsList';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Notification } from './Notification';

type Props = {
  selectedPost: Post,
};

export const Comments: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newCommentFormVisible, setNewCommentFormVisible] = useState(false);

  const loadComments = async () => {
    setIsLoading(true);

    try {
      const response = await getPostComments(selectedPost.id);

      setComments(response);
    } catch {
      setErrorMessage('Unable to load comments');
    } finally {
      setIsLoading(false);
    }
  };

  const onCommentAdd = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  const onCommentDelete = async (id: number) => {
    const savedComments = [...comments];

    setComments(prev => prev.filter(comment => comment.id !== id));

    try {
      await deleteComment(id);
    } catch {
      setErrorMessage('Unable to delete a comment!');
      setComments([...savedComments]);
    }
  };

  useEffect(() => {
    loadComments();

    return () => setNewCommentFormVisible(false);
  }, [selectedPost]);

  return (
    <div className="block">
      {isLoading && <Loader />}

      {errorMessage && (
        <Notification
          isDanger
          message={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}

      {(!isLoading && comments.length !== 0) ? (
        <CommentsList
          onCommentDelete={onCommentDelete}
          comments={comments}
        />
      ) : (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      )}

      {(!newCommentFormVisible && !isLoading) && (
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
