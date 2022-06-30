import React, { FormEvent, useState, useEffect } from 'react';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number,
  onAddNewComment: CallableFunction,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  onAddNewComment,
}) => {
  const [newComment, setNewComment] = useState<NewComment>({
    postId: selectedPostId,
    name: '',
    email: '',
    body: '',
  });

  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [isSubmitError, setIsSubmitError] = useState<boolean>(false);

  const clearCommentForm = () => {
    setNewComment({
      postId: selectedPostId,
      name: '',
      email: '',
      body: '',
    });
  };

  const validateForm = () => {
    const { name, email, body } = newComment;

    if (name === '' || email === '' || body === '') {
      return setCanSubmit(false);
    }

    return setCanSubmit(true);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitError(false);

    validateForm();

    if (!canSubmit) {
      return setIsSubmitError(true);
    }

    onAddNewComment(newComment);

    return clearCommentForm();
  };

  useEffect(() => {
    validateForm();
    setIsSubmitError(false);
  }, [newComment]);

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newComment.name}
          onChange={(event) => {
            setNewComment({ ...newComment, name: event.target.value });
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newComment.email}
          onChange={(event) => {
            setNewComment({ ...newComment, email: event.target.value });
          }}
        />
      </div>
      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newComment.body}
          onChange={(event) => {
            setNewComment({ ...newComment, body: event.target.value });
          }}
        />
      </div>
      <button
        type="submit"
        className={`
        NewCommentForm__submit-button
        button
        ${!canSubmit ? 'disabled' : ''}
        `}
      >
        Add a comment
      </button>

      {isSubmitError && (
        <div className="NewCommentForm__submit-button--error">
          <p>Fill out all fields!</p>
        </div>
      )}
    </form>
  );
};
