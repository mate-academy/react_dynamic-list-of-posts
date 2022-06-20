import React, { useState } from 'react';
import { addComment } from '../../api/api';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number;
  setCommentAdded: (prevState: any) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  setCommentAdded,
}) => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');

  const addNewComment = (e: any) => {
    e.preventDefault();

    const comment = {
      name: nameValue,
      email: emailValue,
      body: bodyValue,
      postId: selectedPostId,
    };

    addComment(comment)
      .then(() => {
        setCommentAdded((prevState: boolean) => !prevState);
        setNameValue('');
        setEmailValue('');
        setBodyValue('');
      });
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(e) => addNewComment(e)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={bodyValue}
          onChange={(e) => setBodyValue(e.target.value)}
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
