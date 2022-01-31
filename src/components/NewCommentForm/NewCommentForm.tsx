import React, { useState } from 'react';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  commentsId: number,
  getCommentsFromServer: (id: number) => void,
  setCommentsId: (id: number) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  commentsId,
  getCommentsFromServer,
  setCommentsId,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const createComment = async () => {
    const newComment = {
      postId: commentsId,
      name,
      email,
      body,
    };

    const cleanTheForm = () => {
      setName('');
      setEmail('');
      setBody('');
    };

    await addComment(newComment);
    cleanTheForm();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={async (event) => {
        event.preventDefault();
        await createComment();
        await getCommentsFromServer(commentsId);
        await setCommentsId(0);
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => {
            setBody(event.target.value);
          }}
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
