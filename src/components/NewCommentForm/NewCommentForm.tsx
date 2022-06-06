import React, { useState } from 'react';
import { NewComment } from '../../types/NewComment';
import './NewCommentForm.scss';

interface Props {
  handleAddComment: (newComment: NewComment) => void;
  selectedPostId: number | null,
}

export const NewCommentForm: React.FC<Props> = ({
  handleAddComment,
  selectedPostId,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isBodyValid, setIsBodyValid] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setIsNameValid(false);

      return;
    }

    if (!email.trim()) {
      setIsEmailValid(false);

      return;
    }

    if (!body.trim()) {
      setIsBodyValid(false);

      return;
    }

    if (selectedPostId) {
      const newComment: NewComment = {
        postId: selectedPostId,
        name,
        email,
        body,
      };

      handleAddComment(newComment);
      setName('');
      setEmail('');
      setBody('');
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setName(target.value);
            setIsNameValid(true);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setEmail(target.value);
            setIsEmailValid(true);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={({ target }) => {
            setBody(target.value);
            setIsBodyValid(true);
          }}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>

      <div className="NewCommentForm__error">
        {!isNameValid && '*Please enter a name'}
        {!isEmailValid && '*Please enter your email'}
        {!isBodyValid && '*Please enter a message'}
      </div>
    </form>
  );
};
