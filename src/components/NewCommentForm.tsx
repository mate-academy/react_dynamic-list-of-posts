import React, { useContext, useEffect, useState } from 'react';
import { addComment } from '../Api/getItems';
import { DispatchContext, StateContext } from './store/store';
import cn from 'classnames';

export const NewCommentForm: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { activePostId } = useContext(StateContext);
  const [vaitingAddComment, setVaitingAddComment] = useState(false);
  const [requiredName, setRequiredName] = useState(false);
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [requiredTitle, setRequiredTitle] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    title: '',
  });

  useEffect(() => {
    setRequiredName(false);
  }, [inputs.name]);
  useEffect(() => {
    setRequiredEmail(false);
  }, [inputs.email]);
  useEffect(() => {
    setRequiredTitle(false);
  }, [inputs.title]);

  const addNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.name.trim()) {
      setRequiredName(true);
    }

    if (!inputs.email.trim()) {
      setRequiredEmail(true);
    }

    if (!inputs.title.trim()) {
      setRequiredTitle(true);
    }

    if (!inputs.name.trim() || !inputs.email.trim() || !inputs.title.trim()) {
      return;
    }

    const comment = {
      postId: activePostId,
      name: inputs.name.trim(),
      email: inputs.email.trim(),
      body: inputs.title.trim(),
    };

    setVaitingAddComment(true);
    dispatch({ type: 'SET_ERRORCOMMENTS', isUse: false });

    addComment(comment)
      .then(data => {
        dispatch({ type: 'ADD_COMMENT', comment: data });
        setInputs({
          name: '',
          email: '',
          title: '',
        });
      })
      .catch(() => dispatch({ type: 'SET_ERRORCOMMENTS', isUse: true }))
      .finally(() => setVaitingAddComment(false));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={addNewComment}>
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
            className={cn('input', {
              'is-danger': requiredName,
            })}
            value={inputs.name}
            onChange={e =>
              setInputs(prev => {
                return { ...prev, name: e.target.value };
              })
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {requiredName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {requiredName && (
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
            className={cn('input', {
              'is-danger': requiredEmail,
            })}
            value={inputs.email}
            onChange={e =>
              setInputs(prev => {
                return { ...prev, email: e.target.value };
              })
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {requiredEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {requiredEmail && (
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
            className={cn('textarea', {
              'is-danger': requiredTitle,
            })}
            value={inputs.title}
            onChange={e =>
              setInputs(prev => {
                return { ...prev, title: e.target.value };
              })
            }
          />
        </div>

        {requiredTitle && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': vaitingAddComment,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
