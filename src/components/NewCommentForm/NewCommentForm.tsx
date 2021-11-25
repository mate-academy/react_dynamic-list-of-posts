import React, { useState } from 'react';
import { createComment } from '../../api/comments';
import './NewCommentForm.scss';

interface Props {
  postId: number,
  updateComments: () => Promise<void>,
}

export const NewCommentForm: React.FC<Props> = React.memo(
  ({ postId, updateComments }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [comment, setComment] = useState('');

    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const { name, value } = event.target;

      switch (name) {
        case 'userName':
          setUserName(value);
          break;
        case 'userEmail':
          setUserEmail(value);
          break;
        case 'comment':
          setComment(value);
          break;
        default:
          throw new Error(`Unknown input name: ${name}`);
      }
    };

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      const createdComment = await createComment({
        postId,
        name: userName,
        email: userEmail,
        body: comment,
      });

      if (createdComment) {
        updateComments();
      }

      setUserName('');
      setUserEmail('');
      setComment('');
    };

    return (
      <form className="NewCommentForm" onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            type="text"
            name="userName"
            placeholder="Your name"
            className="NewCommentForm__input"
            value={userName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-field">
          <input
            type="text"
            name="userEmail"
            placeholder="Your email"
            className="NewCommentForm__input"
            value={userEmail}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-field">
          <textarea
            name="comment"
            placeholder="Type comment here"
            className="NewCommentForm__input"
            value={comment}
            onChange={handleInputChange}
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
  },
);
