import React, { useState } from 'react';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

// type Comment = {
//   id: number;
//   body: string;
// };

type Props = {
  selectedPostId: number;
  trigger: boolean;
  setTrigger:(value: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  trigger,
  setTrigger,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && email && comment) {
      addComment(selectedPostId, name, email, comment)
        .then(() => {
          setTrigger(!trigger);
        });
      setName('');
      setEmail('');
      setComment('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError(false);
          }}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError(false);
          }}
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
            setError(false);
          }}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
      {error && (
        <div className="NewCommentForm__error">
          Please enter all required information
        </div>
      )}

    </form>
  );
};
