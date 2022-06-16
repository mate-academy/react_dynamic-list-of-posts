import React, { useState } from 'react';
import { postComment } from '../../api/comments';
import './NewCommentForm.scss';

interface Props {
  currentPostId : number;
  needToUpdate: boolean,
  setNeedToUpdate: (arg0 : boolean) => void;
}

export const NewCommentForm: React.FC<Props> = (
  { currentPostId, needToUpdate, setNeedToUpdate },
) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [memo, setMemo] = useState('');

  return (
    <form
      className="NewCommentForm"
      onSubmit={async (event) => {
        event.preventDefault();
        await postComment(name, email, memo, currentPostId);
        setNeedToUpdate(!needToUpdate);
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={memo}
          onChange={(event) => {
            setMemo(event.target.value);
          }}
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
