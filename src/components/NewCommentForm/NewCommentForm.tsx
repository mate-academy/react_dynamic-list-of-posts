import React, { useState } from 'react';
import { createComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  postId: number,
  updateComments: () => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = React.memo(
  ({ postId, updateComments }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');

    const handleInputChange = (event:
    React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      switch (event.target.name) {
        case 'name':
          setName(value);
          break;
        case 'email':
          setEmail(value);
          break;
        case 'body':
          setBody(value);
          break;
        default:
      }
    };

    const clearForm = () => {
      setName('');
      setEmail('');
      setBody('');
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      const createdComment = await createComment({
        postId,
        name,
        email,
        body,
      });

      if (createdComment) {
        updateComments();
      }

      clearForm();
    };

    return (
      <form
        className="NewCommentForm"
        onSubmit={handleFormSubmit}
      >
        <div className="form-field">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Your name"
            className="NewCommentForm__input"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-field">
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Your email"
            className="NewCommentForm__input"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-field">
          <textarea
            name="body"
            value={body}
            placeholder="Type comment here"
            className="NewCommentForm__input"
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
