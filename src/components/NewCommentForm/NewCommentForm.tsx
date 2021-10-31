import React, { useEffect, useState } from 'react';
import { addPostComments } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  postId: number,
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const onSubmitForm: React.FormEventHandler = (event) => {
    event.preventDefault();
    addPostComments({
      name,
      email,
      body,
      postId,
    });

    setName('');
    setEmail('');
    setBody('');
  };

  useEffect(() => {
    setName('');
    setEmail('');
    setBody('');
  }, [postId]);

  return (
    <form className="NewCommentForm" onSubmit={onSubmitForm}>
      <div className="form-field">
        <input
          value={name}
          name={name}
          onChange={event => setName(event.target.value)}
          type="text"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <input
          value={email}
          name={email}
          onChange={event => setEmail(event.target.value)}
          type="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <textarea
          value={body}
          onChange={event => setBody(event.target.value)}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
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
