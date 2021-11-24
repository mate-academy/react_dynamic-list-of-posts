import React, { useState } from 'react';
import { newCommentFormSubmit } from '../../api/comments';
import './NewCommentForm.scss';

interface Props {
  postId: number,
  updateComments: () => void,
}
export const NewCommentForm: React.FC<Props> = React.memo(
  ({ postId, updateComments }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');

    const clearForm = () => {
      setName('');
      setEmail('');
      setBody('');
    };

    const onSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const newComment = await newCommentFormSubmit({
        postId, name, email, body,
      });

      if (newComment) {
        updateComments();
      }

      clearForm();
    };

    return (
      <form
        action="POST"
        className="NewCommentForm"
        onSubmit={onSubmit}
      >
        <div className="form-field">
          <input
            value={name}
            type="text"
            name="name"
            placeholder="Your name"
            className="NewCommentForm__input"
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="form-field">
          <input
            value={email}
            type="text"
            name="email"
            placeholder="Your email"
            className="NewCommentForm__input"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-field">
          <textarea
            value={body}
            name="body"
            placeholder="Type comment here"
            className="NewCommentForm__input"
            onChange={(event) => setBody(event.target.value)}
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
