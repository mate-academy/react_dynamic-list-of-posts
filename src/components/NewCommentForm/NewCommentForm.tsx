import React, { useEffect, useState } from 'react';
import { createComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: string | null;
  loadPostDetails: () => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  loadPostDetails,
}) => {
  const initialNewComment: NewCommentType = {
    postId: selectedPostId,
    name: '',
    email: '',
    body: '',
  };

  const [
    newComment,
    setNewComment,
  ] = useState<NewCommentType>(initialNewComment);

  const [showErrorInput, setShowErrorInput] = useState<{
    name: boolean;
    email: boolean;
    body: boolean;
  }>({
    name: false,
    email: false,
    body: false,
  });

  useEffect(() => {
    setNewComment(initialNewComment);
  },
  [
    selectedPostId,
  ]);

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewComment({
      ...newComment,
      [event.target.name]: event.target.value,
    });

    setShowErrorInput({
      ...showErrorInput,
      [event.target.name]: false,
    });
  };

  const validateInputHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.value.length === 0) {
      setShowErrorInput({
        ...showErrorInput,
        [event.target.name]: true,
      });
    }
  };

  const newCommentFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setShowErrorInput({
      name: (newComment.name.length === 0),
      email: (newComment.email.length === 0),
      body: (newComment.body.length === 0),
    });

    if ((newComment.name.length > 0)
    && (newComment.email.length > 0)
    && (newComment.body.length > 0)) {
      createComment(newComment).then(() => loadPostDetails());
      setNewComment(initialNewComment);
      setShowErrorInput({
        name: false,
        email: false,
        body: false,
      });
    }
  };

  return (
    <form
      className="NewCommentForm"
      method="POST"
      onSubmit={newCommentFormSubmit}
    >
      <div className="NewCommentForm__form-field">

        <p className="NewCommentForm__error">
          {showErrorInput.name ? 'Please enter a name' : ' '}
        </p>

        <input
          type="text"
          name="name"
          placeholder={showErrorInput.name ? '' : 'Your name'}
          className="NewCommentForm__input"
          value={newComment.name}
          onChange={inputChangeHandler}
          onBlur={(event) => validateInputHandler(event)}
        />
      </div>

      <div className="NewCommentForm__form-field">
        {showErrorInput.email && (
          <p className="NewCommentForm__error">Please enter an email</p>
        )}
        <input
          type="text"
          name="email"
          placeholder={showErrorInput.email ? '' : 'Your email'}
          className="NewCommentForm__input"
          value={newComment.email}
          onChange={inputChangeHandler}
          onBlur={(event) => validateInputHandler(event)}
        />
      </div>

      <div className="NewCommentForm__form-field">
        {showErrorInput.body && (
          <p className="NewCommentForm__error NewCommentForm__error--text-area">
            Please enter a comment
          </p>
        )}
        <textarea
          name="body"
          placeholder={showErrorInput.body ? '' : 'Type comment here'}
          className="NewCommentForm__input NewCommentForm__input--text-area"
          value={newComment.body}
          onChange={inputChangeHandler}
          onBlur={(event) => validateInputHandler(event)}
          rows={3}
          wrap="hard"
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
