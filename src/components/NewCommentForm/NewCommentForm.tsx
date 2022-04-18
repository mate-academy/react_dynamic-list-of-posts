import React, { useState } from 'react';
import './NewCommentForm.scss';
import { FetchComment } from '../../types/Comment';

interface Props {
  createComment: (newComment: FetchComment) => void,
  postId: number
}

export const NewCommentForm: React.FC<Props> = React.memo(
  ({ createComment, postId }) => {
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputBody, setInputBody] = useState('');

    const handleChange
    = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;

      switch (name) {
        case 'name':
          setInputName(value);
          break;
        case 'email':
          setInputEmail(value);
          break;
        case 'body':
          setInputBody(value);
          break;
        default:
          break;
      }
    };

    const clear = () => {
      setInputBody('');
      setInputEmail('');
      setInputName('');
    };

    const commentSumbit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      createComment({
        postId,
        name: inputName,
        email: inputEmail,
        body: inputBody,
      });
      clear();
    };

    return (
      <form
        className="NewCommentForm"
        onSubmit={commentSumbit}
      >
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="NewCommentForm__input"
            value={inputName}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <input
            type="text"
            name="email"
            placeholder="Your email"
            className="NewCommentForm__input"
            value={inputEmail}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <textarea
            name="body"
            placeholder="Type comment here"
            className="NewCommentForm__input"
            value={inputBody}
            onChange={handleChange}
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
