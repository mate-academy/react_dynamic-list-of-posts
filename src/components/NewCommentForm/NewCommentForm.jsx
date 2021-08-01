import React, { useState } from 'react';
import { NewCommentFormPropTypes } from './NewCommentFormPropTypes';
import './NewCommentForm.scss';
import { addComments } from '../../api/posts';

export const NewCommentForm = (
  { selectedPostId, setDeleteOrAddWait, setWaitForComments },
) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          value={name}
          onChange={({ target }) => setName(target.value)}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>
      <div className="form-field">
        <input
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>
      <div className="form-field">
        <textarea
          name="body"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          placeholder="Type comment here"
          className="NewCommentForm__input"
        />
      </div>
      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={(event) => {
          event.preventDefault();
          setDeleteOrAddWait(prev => prev + 1);
          setWaitForComments(true);
          setName('');
          setEmail('');
          setComment('');
          addComments(selectedPostId, {
            name, email, body: comment,
          });
        }}
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = NewCommentFormPropTypes;
