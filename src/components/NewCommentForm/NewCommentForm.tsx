import React, { useState } from 'react';
import './NewCommentForm.scss';
import { Comment } from '../../types/comment';

type Props = {
  selectedPostId: number,
  commentsLength:number,
  addComment: (newComment: Comment) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  commentsLength,
  addComment,
}) => {
  const [newId, setNewId] = useState(commentsLength);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newText, setNewText] = useState('');

  const handleChange = (
    setInput: (value: string) => void,
    event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setInput(event.target.value);
  };

  const resetForm = () => {
    setNewName('');
    setNewEmail('');
    setNewText('');
  };

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    setNewId((prev) => prev + 1);

    if (newName && newEmail && newText) {
      const newComment: Comment = {
        id: newId,
        name: newName,
        postId: selectedPostId,
        email: newEmail,
        body: newText,
      };

      addComment(newComment);
      resetForm();
    }
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
          value={newName}
          required
          onChange={(value) => handleChange(setNewName, value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newEmail}
          required
          onChange={(value) => handleChange(setNewEmail, value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newText}
          required
          onChange={(value) => handleChange(setNewText, value)}
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
