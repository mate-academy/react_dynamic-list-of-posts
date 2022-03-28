import React, { useState } from 'react';
import './NewCommentForm.scss';
import { BASE_URL } from '../../api/api';

interface Props {
  postId: number,
  updateComent: () => void;
}

export const NewCommentForm: React.FC<Props> = ({ postId, updateComent }) => {
  const [newCommentName, setNewComment] = useState('');
  const [newCommentEmail, setNewCommentEmail] = useState('');
  const [newCommentBody, setNewCommentBody] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommentEmail(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentBody(event.target.value);
  };

  const addComment = async () => {
    const data = {
      postId,
      name: newCommentName,
      email: newCommentEmail,
      body: newCommentBody,
    };

    const URL = `${BASE_URL}/comments`;

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    });

    return response.json();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await addComment();
    setNewComment('');
    setNewCommentEmail('');
    setNewCommentBody('');
    updateComent();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          value={`${newCommentName}`}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={handleNameChange}
        />
      </div>

      <div className="form-field">
        <input
          value={`${newCommentEmail}`}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={handleEmailChange}
        />
      </div>

      <div className="form-field">
        <textarea
          value={`${newCommentBody}`}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={handleBodyChange}
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
