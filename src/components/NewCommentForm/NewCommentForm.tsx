/* eslint-disable no-console */
import React, { useState } from 'react';
import './NewCommentForm.scss';

type Comment = {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
};

type Props = {
  deletedCommentId: number;
  postComments: Comment[];
  postId: number;
  addComment: (newComment: Comment) => void
};

export const NewCommentForm: React.FC<Props> = (props) => {
  const { postComments, deletedCommentId } = props;

  const maxIndex = Math.max(...postComments.map(postComment => postComment.id));
  const newId = deletedCommentId ? maxIndex + 1 : deletedCommentId;

  const [newComment, setNewComment] = useState<Comment>({
    id: newId,
    postId: props.postId,
    name: '',
    email: '',
    body: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;

    setNewComment((currentFields) => ({
      ...currentFields,
      [name]: value,
    }));
  };

  const addCommentOnClick = () => {
    props.addComment(newComment);
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => handleChange(event)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => handleChange(event)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => handleChange(event)}
        />
      </div>

      <button
        type="button"
        className="NewCommentForm__submit-button button"
        onClick={() => addCommentOnClick()}
      >
        Add a comment
      </button>
    </form>
  );
};
