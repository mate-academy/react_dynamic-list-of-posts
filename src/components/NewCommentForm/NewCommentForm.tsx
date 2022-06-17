import React, { ChangeEvent, useState } from 'react';
import { forComment } from '../../react-app-env';
import './NewCommentForm.scss';

type Props = {
  comments: forComment[] | null;
  setComments: (comments: forComment[]) => void;
  selectedId: number;
};

export const NewCommentForm: React.FC<Props> = ({ comments, setComments, selectedId }) => {
  const [comment, setComment] = useState<forComment>({
    id: 0,
    createdAt: '',
    updatedAt: '',
    postId: 0,
    name: '',
    email: '',
    body: '',
  });
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [nameErr, setNameErr] = useState<boolean>(false);
  const [commentErr, setCommentErr] = useState<boolean>(false);

  const clearState = () => {
    setComment({
      id: 0,
      createdAt: '',
      updatedAt: '',
      postId: 0,
      name: '',
      email: '',
      body: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newComment: forComment = {
      ...comment,
    };

    if (newComment.name === '') {
      setNameErr(true);

      return;
    }

    setNameErr(false);

    if (newComment.email === '') {
      setEmailErr(true);

      return;
    }

    setEmailErr(false);

    if (newComment.body === '') {
      setCommentErr(true);

      return;
    }

    setCommentErr(false);

    let max = 0;

    if (comments === null) {
      newComment.id = max;
      setComments([newComment]);
    } else {
      comments.forEach(
        (item) => {
          if (item.id >= max) {
            max = item.id;
          }
        },
      );
      newComment.id = max + 1;
      setComments([...comments, newComment]);
    }

    clearState();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const key: keyof forComment = name as keyof forComment;

    setComment({
      ...comment,
      [key]: value,
    } as unknown as Pick<forComment, keyof forComment>);
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={comment.name}
          onChange={handleChange}
          disabled={selectedId === -1}
        />
        {nameErr && (<p style={{ color: 'red' }}>plese enter the name</p>)}
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={comment.email}
          onChange={handleChange}
          disabled={selectedId === -1}
        />
        {emailErr && (<p style={{ color: 'red' }}>plese enter the email</p>)}
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment.body}
          onChange={handleChange}
          disabled={selectedId === -1}
        />
        {commentErr && (<p style={{ color: 'red' }}>plese enter the comment</p>)}
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        disabled={selectedId === -1}
      >
        Add a comment
      </button>
    </form>
  );
};
