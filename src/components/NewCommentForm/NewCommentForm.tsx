import React, { useState, useEffect } from 'react';
import './NewCommentForm.scss';
import { addNewComment } from '../../api/comments';

type Props = {
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const [name, setName] = useState('');
  const [email, setMail] = useState('');
  const [body, setBody] = useState('');

  const resetForm = () => {
    setName('');
    setMail('');
    setBody('');
  };

  useEffect(() => {
    resetForm();
  }, [postId]);

  const submitForm: React.FormEventHandler = (e) => {
    e.preventDefault();

    addNewComment({
      name,
      email,
      body,
      postId,
    })
      .catch(error => {
        throw new Error(`${error} - fix it`);
      });

    resetForm();
  };

  return (
    <form
      onSubmit={submitForm}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          required
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          required
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => setMail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          required
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input NewCommentForm__textarea"
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
    </form>
  );
};
