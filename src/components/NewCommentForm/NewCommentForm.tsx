import React, { useState } from 'react';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  postId: number
  updateComments: (currentPostId: number) => Promise<void>
};

export const NewCommentForm: React.FC<Props> = (props) => {
  const { postId, updateComments } = props;
  const [currentName, setCurrentName] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentText, setCurrentText] = useState('');
  const handleAddComment = async () => {
    await addComment(postId, currentName, currentEmail, currentText);
    updateComments(postId);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={async (event) => {
        event.preventDefault();
        await handleAddComment();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={currentName}
          onChange={(event) => setCurrentName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={currentEmail}
          onChange={(event) => setCurrentEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={currentText}
          onChange={(event) => setCurrentText(event.target.value)}
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
