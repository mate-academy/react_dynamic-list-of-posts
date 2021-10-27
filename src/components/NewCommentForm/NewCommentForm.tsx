import React, { useState } from 'react';
import './NewCommentForm.scss';

interface Props {
  postId: number,
  addCommentAfterSubmit: (comment: Partial<Comment>) => void,
}

export const NewCommentForm: React.FC<Props> = ({ postId, addCommentAfterSubmit }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newComment: Partial<Comment> = {
          postId,
          name,
          email,
          body,
        };

        addCommentAfterSubmit(newComment);

        setName('');
        setEmail('');
        setBody('');
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
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
