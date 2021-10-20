import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  onAddTheComment: (newComment: Partial<Comment>) => void,
  selectedPostId: number,
};

export const NewCommentForm: React.FC<Props> = ({ onAddTheComment, selectedPostId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNewComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const resetInputFields = () => {
    setName('');
    setEmail('');
    setNewComment('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const comment = {
      name,
      email,
      body: newComment,
      postId: selectedPostId,
    };

    onAddTheComment(comment);
    resetInputFields();
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
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          required
          onChange={handleNameChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          onChange={handleEmailChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={newComment}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          onChange={handleNewComment}
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
