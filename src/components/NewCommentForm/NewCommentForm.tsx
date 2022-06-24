import React, { FormEvent, useState } from 'react';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  postId: number,
  onCommentsHandler: () => void,
};

export const NewCommentForm: React.FC<Props> = ({
  postId, onCommentsHandler,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isError, setIsError] = useState(false);

  const isFormValid = () => {
    if (name && email && comment) {
      return true;
    }

    return false;
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid()) {
      const newComment = {
        postId,
        name,
        email,
        body: comment,
      };

      await addComment(newComment);
      onCommentsHandler();
      setIsError(false);
      setName('');
      setEmail('');
      setComment('');
    } else {
      setIsError(true);
    }
  };

  return (
    <form className="NewCommentForm" onSubmit={submitHandler}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment}
          onChange={event => setComment(event.target.value)}
          placeholder="Type comment here"
          className="NewCommentForm__input"
        />
      </div>
      {isError && (
        <div className="error">
          Please, fill in all fields
        </div>
      )}
      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
