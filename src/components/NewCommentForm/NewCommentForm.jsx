import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../api/comments';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, updateComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (!name || !body || !email) {
      setError('Fill all fields');

      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Fill email correct');

      return;
    }

    await addComment(postId, name, email, body);
    updateComments();

    setName('');
    setBody('');
    setEmail('');
    setError('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <Input
          name="name"
          value={name}
          placeholder="Your name"
          onChange={event => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <Input
          name="email"
          value={email}
          placeholder="Your email"
          onChange={event => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <Textarea
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

      {error && <p className="NewCommentForm__error">{error}</p>}
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  updateComments: PropTypes.func.isRequired,
};
