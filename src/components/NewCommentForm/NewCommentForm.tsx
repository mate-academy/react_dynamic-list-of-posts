import React, { useState } from 'react';
import './NewCommentForm.scss';

type NewCommentFormProps = {
  addCommentFunc:(name: string, email: string, body: string) => void,
};

export const NewCommentForm: React.FC<NewCommentFormProps> = (props) => {
  const { addCommentFunc } = props;
  const [formData, setForm] = useState({
    name: '',
    email: '',
    comment: '',
  });

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        const { name, email, comment } = formData;

        addCommentFunc(name, email, comment);
        const target = event.target as HTMLFormElement;

        target.reset();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={({ target }) => setForm(prevState => ({
            ...prevState,
            name: target.value,
          }))}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={({ target }) => setForm(prevState => ({
            ...prevState,
            email: target.value,
          }))}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={({ target }) => setForm(prevState => ({
            ...prevState,
            comment: target.value,
          }))}
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
