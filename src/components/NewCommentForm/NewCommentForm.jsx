import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createComment, getComments } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, setComments }) => {
  const [inputs, setInputs] = useState({
    name: '', email: '', body: '',
  });
  const [isFormValid, setIsFormValid] = useState(true);

  const handleChange = ({ name, value }) => {
    setInputs(prevInputs => ({
      ...prevInputs, [name]: value,
    }));
    setIsFormValid(true);
  };

  const clearForm = () => {
    setInputs({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleSubmit = async(event) => {
    const { name, email, body } = inputs;

    event.preventDefault();
    if (name.trim().length > 0
    && email.trim().length > 0
    && body.trim().length > 0) {
      await createComment(postId, inputs);
      const comments = await getComments(postId);

      setComments(comments);
      clearForm();
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <>
      <form
        className={isFormValid ? 'NewCommentForm' : 'NewCommentForm formRed'}
        onSubmit={event => handleSubmit(event)}
      >
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="NewCommentForm__input"
            value={inputs.name}
            onChange={event => handleChange(event.target)}
          />
        </div>

        <div className="form-field">
          <input
            type="text"
            name="email"
            placeholder="Your email"
            className="NewCommentForm__input"
            value={inputs.email}
            onChange={event => handleChange(event.target)}
          />
        </div>

        <div className="form-field">
          <textarea
            name="body"
            placeholder="Type comment here"
            className="NewCommentForm__input"
            value={inputs.body}
            onChange={event => handleChange(event.target)}
          />
        </div>

        <button
          type="submit"
          className="NewCommentForm__submit-button button"
        >
          Add a comment
        </button>
      </form>
      {!isFormValid && (
      <div className="alarm">
        <p>Please fill up all fields correctly</p>
      </div>
      )}
    </>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  setComments: PropTypes.func.isRequired,
};
