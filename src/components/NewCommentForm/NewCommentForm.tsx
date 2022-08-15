import React from 'react';
import './NewCommentForm.scss';

type Props = {
  post: Post;
};

export const NewCommentForm: React.FC<Props> = () => (
  <form
    className="NewCommentForm"
    action=""
    method=""
  >
    <div className="form-field">
      <input
        type="text"
        name="name"
        placeholder="Your name"
        className="NewCommentForm__input"
      />
    </div>

    <div className="form-field">
      <input
        type="text"
        name="email"
        placeholder="Your email"
        className="NewCommentForm__input"
      />
    </div>

    <div className="form-field">
      <textarea
        name="body"
        placeholder="Type comment here"
        className="NewCommentForm__input NewCommentForm__input--textarea"
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
