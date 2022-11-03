import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { client } from '../utils/fetchClient';
import { DispatchContext, ReducerActions, StateContext } from '../AppContext';
import { Comment } from '../types/Comment';

interface NewComment {
  name: string;
  email: string;
  comment: string;
  isNameEmpty: boolean;
  isEmailEmpty: boolean;
  isCommentEmpty: boolean;
  isAddingNewComment: boolean;
}

const initialNewComment = {
  name: '',
  email: '',
  comment: '',
  isNameEmpty: false,
  isEmailEmpty: false,
  isCommentEmpty: false,
  isAddingNewComment: false,
};

export const NewCommentForm: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { selectedPost, postComments } = useContext(StateContext);
  const postId = selectedPost?.id || 0;

  const [newComment, setNewComment] = useState<NewComment>(initialNewComment);

  const handelChange = (value: string, key: string) => {
    const isKeyEmpty = `is${key.charAt(0).toUpperCase()}${key.slice(1)}Empty`;

    setNewComment(prevState => ({
      ...prevState,
      [key]: value,
      [isKeyEmpty]: false,
    }));
  };

  const postCommentToApi = async () => {
    setNewComment(prevState => ({
      ...prevState,
      isAddingNewComment: true,
    }));

    await client.post<Comment>(`/comments?postId=${postId}`, {
      postId,
      name: newComment.name,
      email: newComment.email,
      body: newComment.comment,
    })
      .then(res => {
        if (postComments && res.postId) {
          dispatch({
            type: ReducerActions.setPostComments,
            payload: [...postComments, res],
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        setNewComment(prevState => ({
          ...prevState,
          comment: '',
          isAddingNewComment: false,
        }));
      });
  };

  const handelAddComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, comment } = newComment;

    if (!name || !email || !comment) {
      setNewComment(prevState => ({
        ...prevState,
        isNameEmpty: prevState.name.length === 0,
        isEmailEmpty: prevState.email.length === 0,
        isCommentEmpty: prevState.comment.length === 0,
      }));
    } else {
      postCommentToApi();
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => handelAddComment(event)}
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
            className={classNames('input',
              { 'is-danger': newComment.isNameEmpty })}
            value={newComment.name}
            onChange={(event) => handelChange(event.target.value, 'name')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {newComment.isNameEmpty && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {newComment.isNameEmpty && (
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
            className={classNames('input',
              { 'is-danger': newComment.isEmailEmpty })}
            value={newComment.email}
            onChange={(event) => handelChange(event.target.value, 'email')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {newComment.isEmailEmpty && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {newComment.isEmailEmpty && (
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
            className={classNames('textarea',
              { 'is-danger': newComment.isCommentEmpty })}
            value={newComment.comment}
            onChange={(event) => handelChange(event.target.value, 'comment')}
          />
        </div>

        {newComment.isCommentEmpty && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link',
              { 'is-loading': newComment.isAddingNewComment })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => setNewComment(initialNewComment)}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
