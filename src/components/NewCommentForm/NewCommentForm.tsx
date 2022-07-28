import React, { useState } from 'react';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number,
  loadComments: () => void,
};

export const NewCommentForm: React.FC<Props> = ({ selectedPostId, loadComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const clearInputs = () => {
    setName('');
    setEmail('');
    setText('');
  };

  const addNewComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await addComment({
      postId: selectedPostId,
      name,
      email,
      body: text,
    });

    loadComments();

    clearInputs();
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
          onChange={handleChangeName}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={handleChangeEmail}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={text}
          onChange={handleChangeText}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={addNewComment}
      >
        Add a comment
      </button>
    </form>
  );
};
