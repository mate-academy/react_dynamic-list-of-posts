import React, { useState } from 'react';
import './NewCommentForm.scss';
import { addNewComment } from '../../api/comments';

type Props = {
  detailedPostId: number;
};

export const NewCommentForm: React.FC<Props> = (props) => {
  const { detailedPostId } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleCommentForm = (event: React.FormEvent) => {
    event.preventDefault();
    addNewComment(detailedPostId, name, email, body);
  };

  return (
    <form className="NewCommentForm" onSubmit={handleCommentForm}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => setBody(event.target.value)}
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
