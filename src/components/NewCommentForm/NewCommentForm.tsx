import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  handleAdd: (comment: NewComment) => void
  selectedPostId: number
};

export const NewCommentForm: React.FC<Props> = ({ handleAdd, selectedPostId }) => {
  const [state, setState] = useState<NewComment>({
    name: '',
    email: '',
    body: '',
    postId: 0,
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleOnSubmit = () => {
    const post:NewComment = { ...state, postId: selectedPostId };

    handleAdd(post);
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={handleOnChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={handleOnChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={handleOnChange}
        />
      </div>

      <button
        type="button"
        className="NewCommentForm__submit-button button"
        onClick={handleOnSubmit}
      >
        Add a comment
      </button>
    </form>
  );
};
