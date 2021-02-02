import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';
import classnames from 'classnames';

export const NewCommentForm = ({ addComment }) => {
  const [inputName, setInputName] = useState('');
  const [inputMail, setInputMail] = useState('');
  const [inputComment, setInputComment] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);

    if (
      inputName.trim()
      && inputMail.trim()
      && inputComment.trim()
    ) {
      addComment({
        name: inputName,
        email: inputMail,
        body: inputComment,
      });

      setInputName('');
      setInputMail('');
      setInputComment('');
      setSubmit(false);
    }
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
          value={inputName}
          placeholder="Your name"
          className={classnames({
            NewCommentForm__input: true,
            'NewCommentForm__input-error': !inputName && submit,
          })}
          onChange={(event) => {
            setInputName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={inputMail}
          placeholder="Your email"
          className={classnames({
            NewCommentForm__input: true,
            'NewCommentForm__input-error': !inputMail && submit,
          })}
          onChange={(event) => {
            setInputMail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className={classnames({
            NewCommentForm__input: true,
            'NewCommentForm__input-error': !inputComment && submit,
          })}
          value={inputComment}
          onChange={(event) => {
            setInputComment(event.target.value);
          }}
        />
      </div>

      <button
        type="submit"
        className={classnames({
          'NewCommentForm__submit-button': true,
          button: true,
          'NewCommentForm__submit-button-active': inputComment,
        })}
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};
