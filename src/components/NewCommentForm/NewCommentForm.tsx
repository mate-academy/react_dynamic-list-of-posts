import React, { useState } from 'react';
import './NewCommentForm.scss';

interface Props {
  id: number,
  addComent:(
    name: string, email: string, comment: string, id: number
  ) => void
}

export const NewCommentForm: React.FC<Props> = ({ id, addComent }) => {
  const [name, changeName] = useState('');
  const [email, changeEmail] = useState('');
  const [comment, changeComment] = useState('');

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          required
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={event => changeName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          required
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={event => changeEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment}
          required
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={event => changeComment(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={() => {
          if (name !== '' && email !== '' && comment !== '') {
            addComent(name, email, comment, id);
            changeName('');
            changeEmail('');
            changeComment('');
          }
        }}
      >
        Add a comment
      </button>
    </form>
  );
};
