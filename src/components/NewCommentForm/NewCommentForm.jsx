import React, { useState } from 'react';
import './NewCommentForm.scss';
import { getPostComments, addComment } from '../../api/comments';

export const NewCommentForm = ({ setComments, postId}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name && email && body) {
      addComment(name, email, body, postId)
        .then(() => getPostComments(postId)
          .then(setComments));

      setName('');
      setEmail('');
      setBody('');
    }
  }

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type body here"
          className="NewCommentForm__input"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a body
      </button>
    </form>
  )
};
