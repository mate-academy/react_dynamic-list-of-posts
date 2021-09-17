import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  postNewComment: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = (props) => {
  const { postId, postNewComment } = props;
  const [name, setCommentName] = useState('');
  const [email, setCommentEmail] = useState('');
  const [body, setCommentBody] = useState('');
  const makeComment = () => {
    return {
      postId,
      name,
      email,
      body,
    };
  };

  const resetInputs = () => {
    setCommentName('');
    setCommentEmail('');
    setCommentBody('');
  };

  const addNewComment = (event: React.FormEvent) => {
    event.preventDefault();
    const newComment = makeComment();

    postNewComment(newComment as Comment);
    resetInputs();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={addNewComment}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(event) => setCommentName(event.target.value)}
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={(event) => setCommentEmail(event.target.value)}
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          onChange={(event) => setCommentBody(event.target.value)}
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
    </form>
  );
};
