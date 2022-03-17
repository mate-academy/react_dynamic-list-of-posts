import React, { useState } from 'react';
import { postComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number,
  fetchComments: () => void,
};

export const NewCommentForm: React.FC<Props> = React.memo(({ selectedPostId, fetchComments }) => {
  const [isInvalidData, setInvalidData] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const nameRef = React.useRef(document.createElement('input'));
  const emailRef = React.useRef(document.createElement('input'));
  const bodyRef = React.useRef(document.createElement('textarea'));

  // eslint-disable-next-line no-console
  console.log('form re');

  const updateComments = async (newComment: CommentToPost) => {
    await postComment(newComment);
    await fetchComments();
    setLoading(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const body = bodyRef.current.value;

    if (!name || !email || !body) {
      setInvalidData(true);
    } else {
      setLoading(true);
      const newComment = {
        postId: selectedPostId,
        name,
        email,
        body,
      };

      nameRef.current.value = '';
      emailRef.current.value = '';
      bodyRef.current.value = '';

      updateComments(newComment);
    }
  };

  return (
    <form className="NewCommentForm" onSubmit={onSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          ref={nameRef}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={() => {
            if (isInvalidData) {
              setInvalidData(false);
            }
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          ref={emailRef}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={() => {
            if (isInvalidData) {
              setInvalidData(false);
            }
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          ref={bodyRef}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={() => {
            if (isInvalidData) {
              setInvalidData(false);
            }
          }}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>

      {isInvalidData && <p>Enter valid data</p>}
      {isLoading && <p>Loading...</p>}
    </form>
  );
});
