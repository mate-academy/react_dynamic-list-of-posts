import React, { useState } from 'react';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  updateComments: (id: number) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, updateComments }) => {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const inputsHendler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.currentTarget;

    switch (name) {
      case 'name':
        setCommentName(value);
        break;
      case 'email':
        setCommentEmail(value);
        break;
      case 'body':
        setCommentBody(value);
        break;
      default:
    }
  };

  const pushNewComment = async () => {
    await addComment({
      postId,
      name: commentName,
      email: commentEmail,
      body: commentBody,
    });
    setCommentName('');
    setCommentEmail('');
    setCommentBody('');

    updateComments(postId);
  };

  const submitHendler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    pushNewComment();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitHendler}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={commentName}
          onChange={inputsHendler}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={commentEmail}
          onChange={inputsHendler}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentBody}
          onChange={inputsHendler}
          required
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
