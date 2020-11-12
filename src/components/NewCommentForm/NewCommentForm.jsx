import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../Loader';

import { addComment } from '../../api/coments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, updateComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    setAddingComment(true);
    // eslint-disable-next-line max-len
    const emailRegEx = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!name || !body || !emailRegEx.test(email)) {
      return;
    }

    await addComment(postId, name, email, body);
    await updateComments();
    setBody('');
    setAddingComment(false);
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
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={event => setBody(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>

      {addingComment && (<Loader />)}
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  updateComments: PropTypes.func.isRequired,
};
