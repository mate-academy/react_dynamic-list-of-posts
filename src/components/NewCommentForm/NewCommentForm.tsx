import React, { useCallback, useState } from 'react';
import { postComment } from '../../api/comments';
import './NewCommentForm.scss';

import { Loader } from '../Loader';

type Props = {
  selectedPostId: number,
  fetchComments: () => void,
};

export const NewCommentForm: React.FC<Props> = React.memo(({ selectedPostId, fetchComments }) => {
  const [isInvalidData, setInvalidData] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const resetForm = useCallback(() => {
    setName('');
    setEmail('');
    setBody('');
  }, []);

  const updateComments = useCallback(async (newComment: CommentToPost) => {
    await postComment(newComment);
    await fetchComments();
    setLoading(false);
  }, [fetchComments]);

  const removeError = useCallback(() => {
    if (isInvalidData) {
      setInvalidData(false);
    }
  }, [isInvalidData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

      updateComments(newComment);
      resetForm();
    }
  };

  return (
    <form className="NewCommentForm" onSubmit={onSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => {
            removeError();
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => {
            removeError();
            setEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => {
            removeError();
            setBody(event.target.value);
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
      {isLoading && <Loader />}
    </form>
  );
});
