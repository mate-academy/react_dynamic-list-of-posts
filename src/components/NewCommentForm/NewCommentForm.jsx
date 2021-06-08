import React, { useState } from 'react';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPost, addNewCom }) => {
  const [newCom, setCom] = useState('');
  const [name, setName] = useState('');
  const [email, setMail] = useState('');

  const addCom = {
    postId: selectedPost.id,
    name,
    email,
    body: newCom,
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();

        addNewCom(addCom);

        setCom('');
        setName('');
        setMail('');
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => {
            setMail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newCom}
          onChange={(event) => {
            setCom(event.target.value);
          }}
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
