import React, { useState } from 'react';
import { client } from '../../utils/fetchClient';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

type Props = {
  selectedPost: Post | null
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
}
export const NewCommentForm: React.FC<Props> = ({selectedPost, setComments}) => {
  const [queryName, setQueryName] = useState('');
  const [hasErrorName, setHasErrorName] = useState(false);
  const [queryEmail, setQueryEmail] = useState('');
  const [hasErrorEmail, setHasErrorEmail] = useState(false);
  const [queryComText, setQueryComText] = useState('');
  const [hasErrorComText, setHasErrorComText] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryName(event.target.value);
    setHasErrorName(false);
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryEmail(event.target.value);
    setHasErrorEmail(false);
  };
  const handleChangeComText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQueryComText(event.target.value);
    setHasErrorComText(false);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPost) return;

    const nameError = queryName.trim() === '';
    const emailError = queryEmail.trim() === '';
    const bodyError = queryComText.trim() === '';

    setHasErrorName(nameError);
    setHasErrorEmail(emailError);
    setHasErrorComText(bodyError);

    if (nameError || emailError || bodyError) return;
  
    const newComment: Omit<Comment, 'id'> = {
        postId: selectedPost.id,
        name: queryName.trim(),
        email: queryEmail.trim(),
        body: queryComText.trim()
    };

    setIsSubmitting(true);
    client.post<Comment>('/comments', newComment)
      .then((res) => {
        setComments(prevCom => [...prevCom, res])
        setQueryComText('');
  setHasErrorComText(false)
      })
      .catch(() => {
        setHasErrorName(true);
        setHasErrorEmail(true);
        setHasErrorComText(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      })
  };

  const handleReset = () => {
    setQueryName('');
    setQueryEmail('');
    setQueryComText('');
    setHasErrorName(false);
    setHasErrorEmail(false);
    setHasErrorComText(false);
  }
  return (
    <form 
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={`input ${hasErrorName ? 'is-danger' : ''}`}
            value={queryName}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasErrorName && (
  <span
    className="icon is-small is-right has-text-danger"
    data-cy="ErrorIcon"
  >
    <i className="fas fa-exclamation-triangle" />
  </span>
)}
        </div>

        {hasErrorName && (
          <p 
            className="help is-danger"
            data-cy="ErrorMessage"
          >
            Name is required
          </p>
        )}

      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${hasErrorEmail ? 'is-danger' : ''}`}
            value={queryEmail}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasErrorEmail && (
            <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
          )}
        </div>

        {hasErrorEmail && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
    <textarea
      id="comment-body"
      name="body"
      placeholder="Type comment here"
      className={`textarea ${hasErrorComText ? 'is-danger' : ''}`}
      value={queryComText}
      onChange={handleChangeComText}
    />
  </div>

        {hasErrorComText && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button 
            type="submit"
            className={`button is-link ${isSubmitting ? 'is-loading' : ''}`}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button 
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
