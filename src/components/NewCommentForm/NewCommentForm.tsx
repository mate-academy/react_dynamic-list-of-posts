import React, {
  ChangeEvent, FormEvent, useCallback, useState,
} from 'react';
import { addPostCommentById } from '../../api/comments';
import { Loader } from '../Loader';
import { Comment } from '../../types/Comment';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number;
  addSelectedPostComment: (comment: Omit<Comment, 'id'>) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  addSelectedPostComment,
}) => {
  const initialState = {
    postId: selectedPostId,
    name: '',
    email: '',
    body: '',
  };

  const initialError = {
    name: '',
    email: '',
    body: '',
  };

  const [newComment, setNewComment] = useState(initialState);
  const [newCommentError, setNewCommentError] = useState(initialError);

  const [isUploadComment, setIsUploadComment] = useState(false);

  const catchInpChange = useCallback(async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = event.target;

    setNewComment(prev => ({ ...prev, [name]: value, postId: selectedPostId }));
  }, [selectedPostId, newComment]);

  const catchSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    setNewCommentError({ ...initialError });

    if (!newComment.name.trim()) {
      setNewCommentError(prev => ({ ...prev, name: 'Enter title!' }));
    }

    if (!newComment.body.trim()) {
      setNewCommentError(prev => ({ ...prev, body: 'Enter comment!' }));
    }

    if (!newComment.email.trim()) {
      setNewCommentError(prev => ({ ...prev, email: 'Enter email!' }));
    }

    const validComment = Object.values(newComment)
      .every(item => String(item).trim());
    const validErrors = Object.values(newCommentError).some(item => item);

    if (validComment && !validErrors) {
      setIsUploadComment(true);
      await addPostCommentById(newComment);
      addSelectedPostComment(newComment);

      setIsUploadComment(false);
      setNewComment(initialState);
    }
  }, [newComment, newCommentError, addSelectedPostComment]);

  return (
    <>
      {!isUploadComment
        ? (
          <form
            className="NewCommentForm"
            onSubmit={catchSubmit}
          >
            <div className="form-field">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="NewCommentForm__input"
                onChange={catchInpChange}
                value={newComment.name}
              />
              {newCommentError.name && (
                <p className="error-message">{newCommentError.name}</p>
              )}
            </div>

            <div className="form-field">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="NewCommentForm__input"
                onChange={catchInpChange}
                value={newComment.email}
              />
              {newCommentError.email && (
                <p className="error-message">{newCommentError.email}</p>
              )}
            </div>

            <div className="form-field">
              <textarea
                name="body"
                placeholder="Type comment here"
                className="NewCommentForm__input"
                onChange={catchInpChange}
                value={newComment.body}
              />
              {newCommentError.body && (
                <p className="error-message">{newCommentError.body}</p>
              )}

            </div>

            <button
              type="submit"
              className="NewCommentForm__submit-button button"
            >
              Add a comment
            </button>
          </form>
        )
        : (
          <>
            <h2>
              Updating data
            </h2>
            <Loader />
          </>
        )}
    </>
  );
};
