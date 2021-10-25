import React, { useState } from 'react';
import './NewCommentForm.scss';

interface Props {
  addComment: (commentData: CommentResponse) => void;
}

const emptyFields = (): CommentResponse => ({
  name: '',
  email: '',
  body: '',
});

export const NewCommentForm: React.FC<Props> = ({ addComment }) => {
  const [dataFields, setDataFields] = useState(emptyFields());

  const handleInput = (key: string, value: string) => {
    setDataFields({
      ...dataFields,
      [key]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await addComment(dataFields);
    setDataFields(emptyFields());
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={dataFields.name}
          onChange={e => handleInput('name', e.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={dataFields.email}
          onChange={e => handleInput('email', e.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={dataFields.body}
          onChange={e => handleInput('body', e.target.value)}
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
};
