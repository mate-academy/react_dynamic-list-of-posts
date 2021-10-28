import React, { useState } from 'react';
import { addComment } from '../../api/posts';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  loadComments: () => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, loadComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();

    addComment(postId, name, email, body)
      .then(loadComments);
    clearForm();
  };

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
          required
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={body}
          onChange={(event) => setBody(event.currentTarget.value)}
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
