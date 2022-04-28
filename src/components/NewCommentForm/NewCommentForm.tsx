import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  onAdd: (name: string, email:string, text:string) => void,
};

export const NewCommentForm: React.FC<Props> = ({ onAdd }) => {
  const [name, newName] = useState('');
  const [email, newMail] = useState('');
  const [text, newText] = useState('');

  const reset = () => {
    newName('');
    newMail('');
    newText('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.name === 'name') {
      newName(event.target.value);
    } else {
      newMail(event.target.value);
    }
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    newText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    reset();
    onAdd(name, email, text);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
      method="post"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={text}
          onChange={handleChangeText}
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
