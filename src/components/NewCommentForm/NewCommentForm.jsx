import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../api/comments';
import { InputNameForm } from '../InputNameForm';
import { InputEmailForm } from '../InputEmailForm';
import { InputCommentForm } from '../InputCommentForm';
import './NewCommentForm.scss';

export const NewCommentForm = memo(({
  selectedPostId,
  loadData,
  validation,
  setValidation,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleName = useCallback((event) => {
    setName(event.target.value);
    setValidation(false);
  }, []);

  const handleEmail = useCallback((event) => {
    setEmail(event.target.value);
    setValidation(false);
  }, []);

  const handleComment = useCallback((event) => {
    setComment(event.target.value);
    setValidation(false);
  }, []);

  const submitComment = useCallback(async(event) => {
    event.preventDefault();

    if (name === '' || email === '' || comment === '') {
      setValidation(true);

      return;
    }

    await addComment({
      name,
      email,
      body: comment,
      postId: selectedPostId,
    });

    setName('');
    setEmail('');
    setComment('');

    loadData();
  }, [name, email, comment, selectedPostId]);

  return (
    <form className="NewCommentForm">
      <InputNameForm handleName={handleName} name={name} />
      <InputEmailForm handleEmail={handleEmail} email={email} />
      <InputCommentForm handleComment={handleComment} comment={comment} />

      {validation && (
        <p className="NewCommentForm__error">
          All fields must be filled
        </p>
      )}

      <button
        onClick={submitComment}
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
});

NewCommentForm.propTypes = {
  setValidation: PropTypes.func.isRequired,
  validation: PropTypes.bool.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  loadData: PropTypes.func.isRequired,
}.isRequired;
