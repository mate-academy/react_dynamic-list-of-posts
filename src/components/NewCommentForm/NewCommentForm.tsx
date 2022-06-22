import React, { FormEvent, useState } from 'react';
import { NewComment } from '../../react-app-env';
import { addComment } from '../../api/comment';
import './NewCommentForm.scss';

interface Props {
  selectedPostId: number,
  commentsGetter: () => void,
}

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId, commentsGetter,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const submitter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment: NewComment = {
      postId: selectedPostId,
      name,
      email,
      body,
    };

    await addComment(newComment);
    commentsGetter();
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitter}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
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
