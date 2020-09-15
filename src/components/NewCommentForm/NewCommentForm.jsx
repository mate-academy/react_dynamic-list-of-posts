import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';
import { addComment } from '../../api/comments';

export const NewCommentForm = ({ currentPost }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSendComment = () => {
    if (name.length > 0 && email.length > 0 && body.length > 0) {
      addComment(currentPost.id, name, email, body);
      setName('');
      setEmail('');
      setBody('');
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={event => event.preventDefault()}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => setName(event.target.value.trimLeft())}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => setEmail(event.target.value.trimLeft())}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={event => setBody(event.target.value.trimLeft())}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={handleSendComment}
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  currentPost: PropTypes.shape({
    id: PropTypes.number,
  }),
};

NewCommentForm.defaultProps = {
  currentPost: {
    id: 0,
  },
};
