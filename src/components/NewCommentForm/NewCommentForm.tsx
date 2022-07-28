import React, { useCallback, useState } from 'react';
import { addComment } from '../../api/comments';
import { NewCommentFormProps } from '../../types';
import './NewCommentForm.scss';

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  postId, fetchComments,
}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [commentBody, setComment] = useState('');

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

    return false;
  };

  const clearAllFields = useCallback(() => {
    setUserName('');
    setUserEmail('');
    setComment('');
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
          type="text"
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
    </form>
  );
};
