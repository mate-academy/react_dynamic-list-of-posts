import React, { useState } from 'react';
import './NewCommentForm.scss';
import { postingComment } from '../../api/comments';

type Props = {
  postId: number,
  reloadComments: () => void,
};

export const NewCommentForm: React.FC<Props> = ({ postId, reloadComments }) => {
  const [commentatorName, setCommentatorName] = useState('');
  const [email, setEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const handleCommentName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentatorName(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCommentBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentBody(event.target.value);
  };

  const handleFormSubmit = async () => {
    if (commentatorName && commentatorName) {
      await postingComment({
        postId,
        name: commentatorName,
        email,
        body: commentBody,
      });
      reloadComments();
      setCommentatorName('');
      setEmail('');
      setCommentBody('');
    }
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={commentatorName}
          onChange={handleCommentName}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={handleEmail}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentBody}
          onChange={handleCommentBody}
        />
      </div>

      <button
        type="button"
        className="NewCommentForm__submit-button button"
        onClick={() => handleFormSubmit()}
      >
        Add a comment
      </button>
    </form>
  );
};
