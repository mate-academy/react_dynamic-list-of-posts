import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import classNames from 'classnames';
import { NewCommentFormError } from '../types/Errors NewCommentForm';

type Props = {
  postSelected: Post
  setCommentsFromServer: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const NewCommentForm: React.FC <Props>= ({postSelected, setCommentsFromServer}) => {

  const [authorName, setAuthorName] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')
  const [body, setBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<NewCommentFormError>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if(!authorName.trim()) {
      newErrors.name = 'Name is required'
    } 

    if(!authorEmail.trim()) {
      newErrors.email = 'Email is required'
    } 

    if(!body.trim()) {
      newErrors.body = 'body is required'
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if(!validate()) {
      return;
    }

    const newComment: Omit<Comment, 'id'> = {
      postId: postSelected.id,
      name: authorName.trim(),
      email: authorEmail.trim(),
      body: body.trim()
    }

    client.post<Comment>('/comments', newComment).then((createdComment) => {
      setCommentsFromServer((previous) => [...previous, createdComment])})
      .finally(() => setIsLoading(false))


      setBody('');
  }

  const onClear = () => {
    setAuthorName('');
    setAuthorEmail('');
    setBody('');
    setErrors({});
  }
  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit}>
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
            className={classNames("input" , {"is-danger": errors.name})}
            value={authorName}
            onChange={event => setAuthorName(event.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {errors.name && 
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>}
          
        </div>
            {errors.name && <p className="help is-danger" data-cy="ErrorMessage">
          Name is required
        </p>}
        
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
            className={classNames("input", {"is-danger": errors.email})}
            value={authorEmail}
            onChange={event => setAuthorEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
              {errors.email && <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>}
          
        </div>
          {errors.email && <p className="help is-danger" data-cy="ErrorMessage">
          Email is required
        </p>}
        
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
            className={(classNames("textarea", {"is-danger": errors.body}))}
            value={body}
            onChange={event => setBody(event.target.value)}
          />
        </div>
            {errors.body && <p className="help is-danger" data-cy="ErrorMessage">
          Enter some text
        </p>}
        
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className={classNames("button is-link" , {"is-loading": isLoading})} >
          
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
