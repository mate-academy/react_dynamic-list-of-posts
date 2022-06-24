import React, { useState } from 'react';
import { createPostComments } from '../../api/posts';
import './NewCommentForm.scss';

interface Props {
  postId: number;
  getComments: (id: number) => Promise<void>;
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  getComments,
}) => {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const createComments = async (comment: NewComment) => {
    await createPostComments(comment);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = {
      name: commentName,
      email: commentEmail,
      body: commentBody,
      postId,
    };

    await createComments(newComment);
    await getComments(postId);

    setCommentName('');
    setCommentEmail('');
    setCommentBody('');
  };

  // eslint-disable-next-line no-console
  console.log('work');

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        onSubmit(event);
      }}
    >
      <div className="form-field">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={commentName}
          onChange={event => {
            setCommentName(event.target.value);
          }}
          required
        />
      </div>

      <div className="form-field">
        <input
          name="email"
          type="text"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={commentEmail}
          onChange={event => {
            setCommentEmail(event.target.value);
          }}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentBody}
          onChange={event => {
            setCommentBody(event.target.value);
          }}
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
