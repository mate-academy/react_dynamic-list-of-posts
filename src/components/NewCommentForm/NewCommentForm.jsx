import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewCommentForm.scss';

import { addComment, getPostComments } from '../../api/posts';

export const NewCommentForm = ({ selectedPostId, setComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const onAddComment = async(event) => {
    event.preventDefault();

    const comment = {
      postId: selectedPostId,
      name,
      email,
      body,
    };

    await addComment(comment);
    await getPostComments(selectedPostId)
      .then(comments => setComments(comments));

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form className="NewCommentForm" onSubmit={onAddComment}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={({ target }) => setName(target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={({ target }) => setBody(target.value)}
          required
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
  selectedPostId: PropTypes.number.isRequired,
  setComments: PropTypes.func.isRequired,
};
