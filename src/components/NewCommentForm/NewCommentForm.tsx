import React, { FormEvent, useCallback, useState } from 'react';
import { postComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number;
  loadPostComments: () => void;
};
export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  loadPostComments,
}) => {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBody, setNewBody] = useState('');

  // eslint-disable-next-line max-len
  const submitHandler = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await postComment(
      {
        postId: selectedPostId,
        name: newName,
        email: newEmail,
        body: newBody,
      },
    );
    loadPostComments();
    setNewName('');
    setNewEmail('');
    setNewBody('');
  }, []);

  return (
    <form
      onSubmit={submitHandler}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newBody}
          onChange={(event) => setNewBody(event.target.value)}
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
