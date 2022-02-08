import React, { useState } from 'react';
import { addComment } from '../../api/Comments';
import './NewCommentForm.scss';

type Props = {
  postId: number,
  fetchComments: () => void,
};

export const NewCommentForm: React.FC<Props> = React.memo(({ postId, fetchComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setName(value);
  };

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setEmail(value);
  };

  const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    setComment(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await addComment(postId, name, email, comment);
    await fetchComments();

    setComment('');
    setEmail('');
    setName('');
  };

  // eslint-disable-next-line no-console
  console.log('newcomment');

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={handleInputName}
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleInputEmail}
          placeholder="Your email"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment}
          onChange={handleTextArea}
          placeholder="Type comment here"
          className="NewCommentForm__input"
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
});
