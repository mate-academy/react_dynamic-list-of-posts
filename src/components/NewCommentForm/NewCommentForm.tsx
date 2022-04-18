import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addComment } from '../../api/comments';
import { Comment } from '../../types/Comment';
import './NewCommentForm.scss';

interface Props {
  onAdd: (comment: Comment) => void,
  postId: number,
}

export const NewCommentForm: React.FC<Props> = React.memo(
  ({ onAdd, postId }) => {
    const [newComment, setNewComment] = useState({
      id: '',
      name: '',
      email: '',
      body: '',
    });

    const {
      id, name, email, body,
    } = newComment;

    const handleInput = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const { value } = event.target;

      switch (event.target.name) {
        case 'id':
          setNewComment({
            id: uuidv4(),
            name,
            email,
            body,
          });
          break;

        case 'name':
          setNewComment({
            id,
            name: value,
            email,
            body,
          });
          break;

        case 'email':
          setNewComment({
            id,
            name,
            email: value,
            body,
          });
          break;

        case 'body':
          setNewComment({
            id,
            name,
            email,
            body: value,
          });
          break;

        default:
          break;
      }
    };

    const resetForm = () => {
      setNewComment({
        id: '',
        name: '',
        email: '',
        body: '',
      });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      addComment(id, postId, name, email, body)
        .then((response: Comment) => {
          onAdd(response);
        });

      resetForm();
    };

    return (
      <form
        className="NewCommentForm"
        onSubmit={handleSubmit}
      >
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="NewCommentForm__input"
            value={name}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form-field">
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="NewCommentForm__input"
            value={email}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form-field">
          <textarea
            name="body"
            placeholder="Type comment here"
            className="NewCommentForm__input"
            value={body}
            onChange={handleInput}
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
  },
);
