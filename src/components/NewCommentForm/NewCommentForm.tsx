import React, { useState } from 'react';
import { sendCommentToServer } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  postIdId: number | null,
};

export const NewCommentForm: React.FC<Props> = ({
  postIdId,
}) => {
  const [body, addBody] = useState('');
  const [createdAt, addCreatedAt] = useState('');
  const [email, addEmail] = useState('');

  const sendComment = () => {
    const newComment = {
      body,
      createdAt,
      email,
      id: Math.ceil(Math.random() * (-100)),
      name: `Comment to post #${postIdId}`,
      postId: postIdId,
      updatedAt: '26.10.2021 21:00:00',
    };

    sendCommentToServer(newComment as Comment);
  };

  return (
    <form className="NewCommentForm">

      <div className="form-field">
        <input
          onChange={(event) => addCreatedAt(event.target.value)}
          value={createdAt}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          onChange={(event) => addEmail(event.target.value)}
          value={email}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          onChange={(event) => addBody(event.target.value)}
          value={body}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
        />
      </div>

      <button
        onClick={() => sendComment()}
        type="button"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
