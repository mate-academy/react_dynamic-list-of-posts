import React, { useEffect, useState } from 'react';
import { Post } from '../../types';
import './NewCommentForm.scss';

type Props = {
  handleAddComment: (name: string, email: string, body: string) => void;
  postDetails: Post | null;
};

export const NewCommentForm: React.FC<Props> = ({
  handleAddComment,
  postDetails,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const clearState = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  useEffect(() => {
    clearState();
  }, [postDetails]);

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();

        if (!name || !body || !email) {
          return;
        }

        handleAddComment(name, email, body);

        clearState();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
          placeholder="Type comment here"
          className="NewCommentForm__input"
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
