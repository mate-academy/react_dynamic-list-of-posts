import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  addComment: (n1: string, n2: string, n3: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({ addComment }) => {
  const [commentName, setCommentName] = useState<string>('');
  const [commentEmail, setCommentEmail] = useState<string>('');
  const [commentBody, setCommentBody] = useState<string>('');

  const addFormComment = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    addComment(commentName, commentEmail, commentBody);
    setCommentName('');
    setCommentEmail('');
    setCommentBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={addFormComment}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={commentName}
          onChange={(event) => {
            setCommentName(event.target.value);
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
          value={commentEmail}
          onChange={(event) => {
            setCommentEmail(event.target.value);
          }}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentBody}
          onChange={(event) => {
            setCommentBody(event.target.value);
          }}
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
