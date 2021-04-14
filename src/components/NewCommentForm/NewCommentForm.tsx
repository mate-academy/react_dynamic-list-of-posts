import React, { useState, useEffect, useCallback } from 'react';
import './NewCommentForm.scss';
import { addComment, getPostComments } from '../../api/api';
import { Comment } from '../../types';

type FormEvent = React.FormEvent<HTMLFormElement>;
type FormField = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Props {
  postId: number,
  onSetComments: (comments: Comment[]) => void,
}

export const NewCommentForm:React.FC<Props> = ({ postId, onSetComments }) => {
  const generateId = useCallback(() => {
    return Number(Date.now().toString().slice(-5));
  }, []);

  const [comment, setComment] = useState({
    'name': '',
    'email': '',
    'body': '',
    postId,
    id: generateId(),
  });

  useEffect(() => {
    setComment({
      'name': '',
      'email': '',
      'body': '',
      postId,
      id: generateId(),
    })
  }, [postId]);

  const onAddComment = useCallback( async (event: FormEvent) => {
    event.preventDefault();

    const newComment = {
      ...comment,
      id:  Number(Date.now().toString().slice(-5))
    }
    
    const commentValues = Object.values(newComment);

    if (commentValues.some(value => value === '')) {
      return;
    }

    await addComment(newComment);
    getPostComments(postId).then(onSetComments)
  }, [comment]);

  const handleCommentChange = (event: FormField) => {
    const { name, value } = event.target;

    setComment({...comment, [name]: value});
  };

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
