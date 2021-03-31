import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './NewCommentForm.scss';
import { createComment } from '../../api/api';
import { selectedPostId } from '../../store';

export const NewCommentForm = () => {
  const selectedPost = useSelector(selectedPostId);
  const [commentBody, setCommentBody] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (commentBody.trim().length > 0) {
      await createComment(selectedPost, commentBody);
      setCommentBody('');
    }
  };

  return (
    <>
      <form
        className="NewCommentForm"
        onSubmit={event => handleSubmit(event)}
      >

        <div className="form-field">
          <textarea
            name="body"
            placeholder="Type comment here"
            className="NewCommentForm__input"
            value={commentBody}
            onChange={event => setCommentBody(event.target.value)}
          />
        </div>

        <button
          type="submit"
          className="NewCommentForm__submit-button button"
          disabled={!(commentBody.trim().length > 0)}
        >
          Add a comment
        </button>
      </form>
    </>
  );
};
