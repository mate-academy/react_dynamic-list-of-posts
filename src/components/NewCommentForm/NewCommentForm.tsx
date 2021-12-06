import React, { useState } from 'react';
import { createComment } from '../../api/comments';
import './NewCommentForm.scss';

interface Props {
  postId: number;
  updateDetails: () => void;
}

export const NewCommentForm: React.FC<Props> = (props) => {
  const { postId, updateDetails } = props;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const comment = await createComment(postId, name, email, body);

    if (comment) {
      updateDetails();
    }

    clearForm();
  };

  return (
    <form className="NewCommentForm">
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
          className="NewCommentForm__input NewCommentForm__input--text-area"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={handleFormSubmit}
      >
        Add a comment
      </button>
    </form>
  );
};
