import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  addComment: (comment: PostComment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleAddComment: React.FormEventHandler = (event) => {
    event.preventDefault();

    addComment({
      id: Number(new Date()),
      postId,
      name,
      email,
      body,
    });

    setName('');
    setEmail('');
    setBody('');
  };

  // const [newComment, setNewComment] = useState<PostComment>({
  //   id: Number(new Date()),
  //   postId,
  //   name: '',
  //   email: '',
  //   body: '',
  // } as PostComment);

  // const handleAddComment: React.FormEventHandler = (event) => {
  //   event.preventDefault();

  //   addComment(newComment);

  //   setNewComment(
  //     {
  //       ...newComment,
  //       id: Number(new Date()),
  //       postId,
  //       name: '',
  //       email: '',
  //       body: '',
  //     },
  //   );
  // };

  // const handleChange = (event: {
  //   target: { name: string; value: string; };
  // }) => {
  //   const { name, value } = event.target;

  //   setNewComment(
  //     {
  //       ...newComment,
  //       [name]: value,
  //     },
  //   );
  // };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleAddComment}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={event => setName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={event => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={event => setBody(event.target.value)}
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
