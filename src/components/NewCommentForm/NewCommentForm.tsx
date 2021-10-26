import React, { useEffect, useState } from 'react';
import { addNewComment } from '../../api/comments';
import './NewCommentForm.scss';

interface Props {
  postId: number,
}

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleSubmitForm: React.FormEventHandler = (event) => {
    event.preventDefault();

    const newComment = {
      postId,
      name,
      email,
      body,
    };

    addNewComment(newComment as Comment);
    resetForm();
  };

  useEffect(() => {
    resetForm();
  }, [postId]);

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmitForm}
    >
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
