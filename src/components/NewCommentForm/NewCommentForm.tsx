import React, { FormEvent, useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number;
  addNewComment: (newComment: Partial<Comment>) => void;
};

export const NewCommentForm: React.FC<Props> = (props) => {
  const { selectedPostId, addNewComment } = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addNewComment({
      postId: selectedPostId,
      name,
      email,
      body,
    });

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name.trimLeft()}
          onChange={(event) => setName(event.currentTarget.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email.trimLeft()}
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body.trimLeft()}
          onChange={(event) => setBody(event.currentTarget.value)}
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
