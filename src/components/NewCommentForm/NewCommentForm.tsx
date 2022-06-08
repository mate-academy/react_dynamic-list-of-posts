import React, { useEffect, useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  handleAddComment: CallableFunction,
  selectedPostId: number,
};

export const NewCommentForm: React.FC<Props> = ({
  handleAddComment,
  selectedPostId,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [inputError, setInputError] = useState(false);

  const clearState = () => {
    setName('');
    setEmail('');
    setBody('');
    setInputError(false);
  };

  useEffect(() => {
    clearState();
  }, [selectedPostId]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (name === '' || email === '' || body === '') {
      setInputError(true);

      return;
    }

    await handleAddComment(name, email, body);

    clearState();
  };

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
          className="NewCommentForm__input"
          onChange={(event) => {
            setName(event.target.value);
            setInputError(false);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          value={email}
          className="NewCommentForm__input"
          onChange={(event) => {
            setEmail(event.target.value);
            setInputError(false);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={body}
          className="NewCommentForm__input"
          onChange={(event) => {
            setBody(event.target.value);
            setInputError(false);
          }}
        />
      </div>

      {inputError && (
        <div className="NewCommentForm__error-message">
          <p className="error">Please, enter comment details</p>
        </div>
      )}

      <button
        disabled={inputError}
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
