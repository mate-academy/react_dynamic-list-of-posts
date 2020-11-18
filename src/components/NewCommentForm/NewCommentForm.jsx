import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

const NewCommentForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const changeEmail = (event) => {
    const { value } = event.target;

    setEmail(value);
  };

  const changeName = (event) => {
    const { value } = event.target;

    setName(value);
  };

  const changeText = (event) => {
    const { value } = event.target;

    setText(value);
  };

  const handleSumbit = (event) => {
    event.preventDefault();

    if (name && email && text) {
      onSubmit({
        name,
        email,
        body: text,
      });

      setName('');
      setEmail('');
      setText('');
    }
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSumbit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={changeName}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={changeEmail}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={text}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={changeText}
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

NewCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export { NewCommentForm };
