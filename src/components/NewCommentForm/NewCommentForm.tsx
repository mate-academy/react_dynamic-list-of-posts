import React, { useState } from 'react';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  postId: number,
  loadComments: (postId: number) => void,
};

export const NewCommentForm: React.FC<Props> = ({ postId, loadComments }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case 'userName':
        setUserName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'body':
        setBody(value);
        break;
      default:
        throw new Error(`Unknown input name: ${name}`);
    }
  };

  const clearForm = () => {
    setUserName('');
    setEmail('');
    setBody('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = await addComment(
      postId,
      userName,
      email,
      body,
    );

    if (newComment) {
      loadComments(postId);
    }

    clearForm();
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="userName"
          value={userName}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={handleChange}
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
