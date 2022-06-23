import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number,
  comments: Comment[] | undefined,
  setNewComment: (currentComments: Comment[], newComment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  comments,
  setNewComment,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const url = 'https://mate.academy/students-api/comments';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId: selectedPostId,
      name,
      email,
      body,
    }),
  };
  const submitHandler = () => {
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((newComment) => {
        setNewComment(comments || [], newComment);
      });

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        submitHandler();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => setBody(event.target.value)}
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
