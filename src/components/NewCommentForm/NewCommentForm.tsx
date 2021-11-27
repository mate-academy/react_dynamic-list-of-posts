/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import './NewCommentForm.scss';

interface Props {
  id: number,
  addComment: (newComment:AddComment) => void
}

export const NewCommentForm: React.FC<Props> = ({ id, addComment }) => {
  const [newComment, setnewComment] = useState<AddComment>(
    {
      postId: 0,
      name: '',
      email: '',
      body: '',
    },
  );

  useEffect(() => {
    setnewComment(state => ({ ...state, postId: id }));
  }, [id]);

  function inputValue(event:HTMLInputElement | HTMLTextAreaElement) {
    setnewComment(state => ({ ...state, [event.name]: event.value }));
  }

  async function sendComment(event:React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    await addComment(newComment);
    setnewComment({
      postId: 0,
      name: '',
      email: '',
      body: '',
    });
  }

  return (
    <form
      className="NewCommentForm"
      onSubmit={sendComment}
    >
      {console.log(id)}
      <div className="form-field">
        <input
          required
          onChange={(event) => {
            inputValue(event.target);
          }}
          type="text"
          name="name"
          value={newComment.name}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          required
          onChange={(event) => {
            inputValue(event.target);
          }}
          type="text"
          value={newComment.email}
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          required
          onChange={(event) => {
            inputValue(event.target);
          }}
          value={newComment.body}
          name="body"
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
