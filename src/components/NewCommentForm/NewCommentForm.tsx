import React, { useState } from 'react';
import './NewCommentForm.scss';

interface Props {
  postId: number;
  addNewComment: (newComment: Partial<Comment>) => void;
}

export const NewCommentForm: React.FC<Props> = (props) => {
  const { postId, addNewComment } = props;
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const reset = () => {
    setBody('');
    setName('');
    setEmail('');
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleAddComment = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    addNewComment({
      name,
      email,
      body,
      postId,
    });
    reset();
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
          onChange={(event) => handleNameChange(event)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => handleEmailChange(event)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => handleCommentChange(event)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        value={body}
        onClick={(event) => handleAddComment(event)}
      >
        Add a comment
      </button>
    </form>
  );
};
