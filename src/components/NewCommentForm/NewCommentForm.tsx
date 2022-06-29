import React, { useState } from 'react';
import './NewCommentForm.scss';
import { addPostComments } from '../../api/comments';

type Props = {
  selectedPostId: number,
  requestForComments: () => Promise<void>,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  requestForComments,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [commentInput, setCommentInput] = useState('');

  const clear = () => {
    setNameInput('');
    setEmailInput('');
    setCommentInput('');
  };

  const addComment = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (nameInput && emailInput && commentInput) {
      await addPostComments(
        nameInput,
        emailInput,
        commentInput,
        selectedPostId,
      );
      requestForComments();
      clear();
    }
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          required
          value={nameInput}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => (
            setNameInput(event.target.value)
          )}
        />
      </div>

      <div className="form-field">
        <input
          value={emailInput}
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          onChange={(event) => (
            setEmailInput(event.target.value)
          )}
        />
      </div>

      <div className="form-field">
        <textarea
          value={commentInput}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => (
            setCommentInput(event.target.value)
          )}
          required
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={addComment}
      >
        Add a comment
      </button>
    </form>
  );
};
