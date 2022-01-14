import React, { useState } from 'react';
import './NewCommentForm.scss';
import { postComment } from '../../api/comments';

interface Props {
  selectedPostId: number,
  getAllComments: any,
}

export const NewCommentForm: React.FC<Props> = ({ selectedPostId, getAllComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleChange = (event: any) => {
    const input = event.target;

    switch (input.name) {
      case 'name':
        setName(input.value);
        break;

      case 'email':
        setEmail(input.value);
        break;

      case 'body':
        setBody(input.value);
        break;

      default:
        break;
    }
  };

  const addComment = (event: any) => {
    event.preventDefault();
    postComment(selectedPostId, name, email, body);
    setName('');
    setEmail('');
    setBody('');
    getAllComments();
  };

  return (
    <form className="NewCommentForm" onSubmit={addComment}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          required
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          required
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
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
};
