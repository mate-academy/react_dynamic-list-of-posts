import React, { useState } from 'react';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPost, addNewComment }) => {
  const [Comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setMail] = useState('');

  const newComment = {
    postId: selectedPost.id,
    name,
    email,
    body: Comment,
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();

        addNewComment(newComment);

        setComment('');
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
          value={Comment}
          onChange={(event) => {
            setComment(event.target.value);
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
