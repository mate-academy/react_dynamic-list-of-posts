import React, { useState } from 'react';
import './NewCommentForm.scss';

import PropTypes from 'prop-types';

export const NewCommentForm = ({
  addToList,
  data,
  setData,
}) => {
  const [commentBody, setCommentBody] = useState('');
  const [isCommentBodyEmpty, setCommentBodyEmptiness] = useState(false);

  const formSubmit = (event) => {
    event.preventDefault();

    if (!commentBody) {
      setCommentBodyEmptiness(true);

      return;
    }

    addToList();
  };

  const addDataToComment = (target) => {
    setData(prevData => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={event => formSubmit(event)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={data.name}
          onChange={({ target }) => addDataToComment(target)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={data.email}
          onChange={({ target }) => addDataToComment(target)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={data.body}
          onChange={({ target }) => {
            addDataToComment(target);
            setCommentBody(target.value);
            setCommentBodyEmptiness(false);
          }}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>

      {isCommentBodyEmpty && (
        <p style={{ color: 'red' }}>
          Add a comment, please
        </p>
      )}
    </form>
  );
};

NewCommentForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }),
  setData: PropTypes.func.isRequired,
  addToList: PropTypes.func.isRequired,
};

NewCommentForm.defaultProps = {
  data: {
    name: '',
    email: '',
    comment: '',
  },
};
