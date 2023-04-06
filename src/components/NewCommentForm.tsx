import React, {
  Dispatch,
  FormEvent, SetStateAction,
  useState,
} from 'react';
import classNames from 'classnames';
import { postComment } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
  postComments: Comment[];
  setPostComments: Dispatch<SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  setPostComments,
  postComments,
}) => {
  const [fieldName, setFieldName] = useState('');
  const [fieldEmail, setFieldEmail] = useState('');
  const [fieldComment, setFieldComment] = useState('');
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validComment, setValidComment] = useState(false);
  const [isButtonLoad, setIsButtonLoad] = useState(false);

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldName(event.target.value);
    setValidName(false);
  };

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldEmail(event.target.value);
    setValidEmail(false);
  };

  const commentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFieldComment(e.target.value);
    setValidComment(false);
  };

  const clearHandler = () => {
    setValidComment(false);
    setValidName(false);
    setValidEmail(false);
    setFieldName('');
    setFieldEmail('');
    setFieldComment('');
  };

  const submitFormHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formError = false;

    const newComment = {
      postId: selectedPost.id,
      name: fieldName,
      email: fieldEmail,
      body: fieldComment,
    };

    if (fieldName.trim().length === 0) {
      setValidName(true);
      formError = true;
    }

    if (fieldEmail.trim().length === 0) {
      setValidEmail(true);
      formError = true;
    }

    if (fieldComment.trim().length === 0) {
      setValidComment(true);
      formError = true;
    }

    if (!formError) {
      setIsButtonLoad(true);
      postComment(newComment)
        .then(response => {
          setPostComments([...postComments, response]);
          setIsButtonLoad(false);
        });
    }

    setFieldComment('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={submitFormHandler}>
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
            className={classNames('input', {
              'is-danger': validName,
            })}
            value={fieldName}
            onChange={nameChangeHandler}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {validName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {validName && (
          <p className="help is-danger" data-cy="ErrorMessage">
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
            className={classNames('input', {
              'is-danger': validEmail,
            })}
            value={fieldEmail}
            onChange={emailChangeHandler}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {validEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {validEmail && (
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
            className={classNames('textarea', {
              'is-danger': validComment,
            })}
            value={fieldComment}
            onChange={commentChangeHandler}
          />
        </div>

        {validComment && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isButtonLoad,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearHandler}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
