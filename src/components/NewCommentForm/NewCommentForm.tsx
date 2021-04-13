import React, { useState, useEffect } from 'react';
import './NewCommentForm.scss';
import { addComment, getPostComments } from '../../api/api';
import { Comment } from '../../types';

type FormEventType = React.FormEvent<HTMLFormElement>;
type FormFieldType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Props {
  postId: number,
  onSetComments: (comments: Comment[]) => void,
}

export const NewCommentForm:React.FC<Props> = ({ postId, onSetComments }) => {
  const [comment, setComment] = useState({
    'name': '',
    'email': '',
    'body': '',
    postId,
    id: 0
  });

  useEffect(() => {
    setComment({
      'name': '',
      'email': '',
      'body': '',
      postId,
      id: Number(Date.now().toString().slice(-5))
    })
  }, [postId]);

  const onAddComment = async (event: FormEventType) => {
    event.preventDefault();

    const newComment = {
      ...comment,
      id: Number(Date.now().toString().slice(-5)),
    }

    const formValues = Object.values(newComment);

    if (formValues.some(value => value === '')) {
      return;
    }

    await addComment(newComment);
    getPostComments(postId).then(onSetComments)
  }

  const handleCommentChange = (event: FormFieldType) => {
    const { name, value } = event.target;

    setComment({...comment, [name]: value});
  }

  return (
    <form
      className="NewCommentForm"
      onSubmit={onAddComment}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={comment.name}
          onChange={handleCommentChange}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={comment.email}
          onChange={handleCommentChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment.body}
          onChange={handleCommentChange}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  )
}
