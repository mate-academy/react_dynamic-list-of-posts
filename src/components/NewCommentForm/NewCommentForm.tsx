import React, { FormEvent, useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number,
  onAddNewComment: CallableFunction,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  onAddNewComment,
}) => {
  const [nameValue, setNameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [commentValue, setCommentValue] = useState<string>('');
  const [isSubmitError, setIsSubmitError] = useState<boolean>(false);

  const clearCommentForm = () => {
    setNameValue('');
    setEmailValue('');
    setCommentValue('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (nameValue === '' || emailValue === '' || commentValue === '') {
      return setIsSubmitError(true);
    }

    const newComment: NewComment = {
      postId: selectedPostId,
      name: nameValue,
      email: emailValue,
      body: commentValue,
    };

    onAddNewComment(newComment);

    return clearCommentForm();
  };

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
          value={nameValue}
          onChange={(event) => {
            setNameValue(event.target.value);
            setIsSubmitError(false);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={emailValue}
          onChange={(event) => {
            setEmailValue(event.target.value);
            setIsSubmitError(false);
          }}
        />
      </div>
      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentValue}
          onChange={(event) => {
            setCommentValue(event.target.value);
            setIsSubmitError(false);
          }}
        />
      </div>
      <button
        type="submit"
        className={`
        NewCommentForm__submit-button
        button
        ${nameValue === ''
        || emailValue === ''
        || commentValue === '' ? 'disabled' : ''}
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
