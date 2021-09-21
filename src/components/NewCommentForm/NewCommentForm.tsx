import React, { useState, useEffect } from 'react';
import { addPostComment } from '../../api/comments';
import './NewCommentForm.scss';

interface Props {
  postId: number,
  setComments: any,
}

const initialComment = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
}) => {
  const [comment, setComment] = useState(initialComment);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addPostComment({
      postId,
      ...comment,
    })
      .then(res => {
        setComments((prevState: any) => [
          ...prevState,
          res,
        ]);

        setComment(initialComment);
      });
  };

  const changeFieldValue = ({ target }: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = target;

    setComment(prevComment => ({
      ...prevComment,
      [name]: value,
    }));
  };

  useEffect(() => {
    setComment(initialComment);
  }, [postId]);

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={comment.name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={changeFieldValue}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={comment.email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={changeFieldValue}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment.body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={changeFieldValue}
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
