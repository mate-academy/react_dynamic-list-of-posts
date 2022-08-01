import React, { useCallback, useState } from 'react';
import { addComment } from '../../api/comments';
import { NewCommentFormProps } from '../../types';
import './NewCommentForm.scss';

type Validation = {
  isNameValid: null | boolean,
  isEmailValid: null | boolean,
  isCommentValid: null | boolean,
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  postId, fetchComments,
}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [commentBody, setComment] = useState('');
  const [validation, setValidation] = useState<Validation>({
    isNameValid: null,
    isEmailValid: null,
    isCommentValid: null,
  });

  const postComment = async () => {
    await addComment({
      name: userName,
      email: userEmail,
      body: commentBody,
      postId,
      id: 0,
    });
  };

  const validateForm = () => {
    // eslint-disable-next-line max-len
    const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    const formIsValid = userName.length && commentBody.length
    && emailRegex.test(userEmail);

    if (formIsValid) {
      return true;
    }

    if (!userName.length) {
      setValidation((prev) => ({ ...prev, isNameValid: false }));
    } else {
      setValidation((prev) => ({ ...prev, isNameValid: true }));
    }

    if (!emailRegex.test(userEmail)) {
      setValidation((prev) => ({ ...prev, isEmailValid: false }));
    } else {
      setValidation((prev) => ({ ...prev, isEmailValid: true }));
    }

    if (!commentBody.length) {
      setValidation((prev) => ({ ...prev, isCommentValid: false }));
    } else {
      setValidation((prev) => ({ ...prev, isCommentValid: true }));
    }

    return false;
  };

  const clearAllFields = useCallback(() => {
    setUserName('');
    setUserEmail('');
    setComment('');
    setValidation({
      isNameValid: null,
      isEmailValid: null,
      isCommentValid: null,
    });
  }, []);

  const onFormSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (validateForm()) {
      await postComment();
      fetchComments();
      clearAllFields();
    }
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          required
          value={userName}
          onChange={({ target }) => setUserName(target.value)}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          required
          value={userEmail}
          onChange={({ target }) => setUserEmail(target.value)}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={commentBody}
          required
          onChange={({ target }) => setComment(target.value)}
          placeholder="Type comment here"
          className="NewCommentForm__input"
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={(e) => onFormSubmit(e)}
      >
        Add a comment
      </button>
      <div className="errors">
        {validation.isCommentValid === false && (
          <p className="input-error">
            &#8226; Your comment should not be empty
          </p>
        )}
        {validation.isEmailValid === false && (
          <p className="input-error">
            &#8226;  Please enter valid email address
          </p>
        )}
        {validation.isNameValid === false && (
          <p className="input-error">
            &#8226; Field &#8220;name&#8221; should not be empty
          </p>
        )}
      </div>
    </form>
  );
};
