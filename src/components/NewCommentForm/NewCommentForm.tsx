import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getPostComments } from '../../api/comments';
import { NewComment } from '../../react-app-env';
import { setComments } from '../../store';
import { getPostDetailsId } from '../../store/selectors';
import './NewCommentForm.scss';

export const NewCommentForm: React.FC
  = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const postId = useSelector(getPostDetailsId);

    const clearInput = () => {
      setName('');
      setEmail('');
      setComment('');
    };

    const formSubmit = async (event:React.FormEvent) => {
      event.preventDefault();

      const newComment:NewComment = {
        name,
        email,
        body: comment,
        postId,
      };

      await addComment(newComment);
      const result = await getPostComments(postId);

      dispatch(setComments(result));

      clearInput();
    };

    return (
      <form
        className="NewCommentForm"
        onSubmit={formSubmit}
      >
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="NewCommentForm__input"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        <div className="form-field">
          <input
            type="text"
            name="email"
            placeholder="Your email"
            className="NewCommentForm__input"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div className="form-field">
          <textarea
            name="body"
            placeholder="Type comment here"
            className="NewCommentForm__input"
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
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
