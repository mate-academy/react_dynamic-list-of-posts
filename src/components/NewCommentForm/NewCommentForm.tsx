import React, { useState, useEffect } from 'react';
import './NewCommentForm.scss';
import classNames from 'classnames';

import { Comment } from '../../react-app-env';

type Props = {
  selectedPostId: number,
  postComment: (comment: Omit<Comment, 'id'>) => void,
  updateComments: () => void;
  setCommentLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  selectedPostId,
  postComment,
  updateComments,
  setCommentLoading,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isFormValid, setFormValid] = useState(false);

  const changeFormValid = () => {
    if (name && email && comment) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  useEffect(() => {
    changeFormValid();
  }, [comment]);

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCommentLoading(true);

    const postCommentBody = {
      postId: selectedPostId,
      name,
      email,
      body: comment,
    };

    setName('');
    setEmail('');
    setComment('');

    await Promise.all([postComment(postCommentBody), updateComments()]);
    setCommentLoading(false);
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={changeFormValid}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={changeFormValid}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onBlur={changeFormValid}
        />
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className={classNames(
          'button',
          'NewCommentForm__submit-button',
          { 'NewCommentForm__submit-button--disabled': !isFormValid },
        )}
        onClick={(e) => submitHandler(e)}
      >
        Add a comment
      </button>
    </form>
  );
});
