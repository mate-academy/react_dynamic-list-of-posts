import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import * as todoService from '../api';
import { PostsContext } from '../services/Store';
import { LoaderType } from '../types/LoaderType';
import { ErrorType } from '../types/ErrorType';

export const NewCommentForm: React.FC = () => {
  const [commentName, setCommentName] = useState<string>('');
  const [commentEmail, setCommentEmail] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');

  const {
    selectedPostId,
    comments,
    setComments,
    setErrorTypeMessage,
    loading,
    setLoading,
    formSubmition,
    setFormSubmition,
  } = useContext(PostsContext);

  function resetFields() {
    setCommentText('');
    setFormSubmition(false);
  }

  function submitForm(
    comment_name: string,
    comment_email: string,
    comment_text: string,
    selected_postId: number,
  ): Promise<void> {
    const newComment = {
      name: comment_name,
      email: comment_email,
      body: comment_text,
      postId: selected_postId,
    };

    const loadUsers = async () => {
      setLoading(LoaderType.NewComment);
      setErrorTypeMessage(null);
      try {
        const commentFromServer = await todoService.postComment(
          `/comments`,
          newComment,
        );

        const updatedComments = [...comments].concat(commentFromServer);

        setComments(updatedComments);

        resetFields();
      } catch {
        setComments(comments);
        setFormSubmition(false);
        setErrorTypeMessage(ErrorType.CommentsError);
      } finally {
        setLoading(null);
      }
    };

    return loadUsers();
  }

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    setFormSubmition(true);

    if (commentName && commentEmail && commentText && selectedPostId) {
      submitForm(commentName, commentEmail, commentText, selectedPostId);
    }
  };

  function clearFields() {
    setCommentName('');
    setCommentEmail('');
    setCommentText('');
    setFormSubmition(false);
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmitForm}>
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
              'is-danger': !commentName && formSubmition,
            })}
            value={commentName}
            onChange={event => {
              setCommentName(event.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!commentName && formSubmition && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!commentName && formSubmition && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': !commentEmail && formSubmition,
            })}
            value={commentEmail}
            onChange={event => {
              setCommentEmail(event.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!commentEmail && formSubmition && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!commentEmail && formSubmition && (
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
              'is-danger': !commentText && formSubmition,
            })}
            value={commentText}
            onChange={event => {
              setCommentText(event.target.value);
            }}
          />
        </div>

        {!commentText && formSubmition && (
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
              'is-loading': loading === LoaderType.NewComment,
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
            onClick={() => clearFields()}
          >
            Clear
          </button>{' '}
        </div>
      </div>
    </form>
  );
};
