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

  const hendlerInputs = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const resetFields = () => {
    setCommentName('');
    setCommentEmail('');
    setCommentBody('');
  };

  const pushNewComment = async () => {
    await addComment({
      postId,
      name: commentName,
      email: commentEmail,
      body: commentBody,
    });

    resetFields();
    updateComments(postId);
  };

  const hendlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    pushNewComment();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={hendlerSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={commentName}
          onChange={hendlerInputs}
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
          onChange={hendlerInputs}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentBody}
          onChange={hendlerInputs}
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
