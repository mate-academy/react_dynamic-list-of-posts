import classNames from 'classnames';
import React, { useState } from 'react';
import { addComment, getPostComments } from '../../api/comments';
import { Comment } from '../../react-app-env';
import './NewCommentForm.scss';

type Props = {
  postId: number,
  commentId: number
  setComments: (response: Comment[]) => void
};

export const NewCommentForm: React.FC<Props> = ({ postId, commentId, setComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addComment({
      postId,
      name,
      email,
      body: text,
      id: commentId + 1,
    }).then(() => getPostComments(postId).then(response => setComments(response)));
    setName('');
    setEmail('');
    setText('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handlerSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className={classNames('NewCommentForm__submit-button', 'button')}
      >
        Add a comment
      </button>
    </form>
  );
};
