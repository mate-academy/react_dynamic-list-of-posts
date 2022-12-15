import React, {
  // ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import classNames from 'classnames';
import { postComment } from '../api/commets';
import { Comment } from '../types/Comment';

type Props = {
  postIdComments: number | null;
  postComments: Comment[];
  setPostComments: Dispatch<SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  postIdComments,
  postComments,
  setPostComments,
}) => {
  const [commentIsOnLoading, setCommentIsOnLoading] = useState(false);
  const [query, setQuery] = useState({
    name: '',
    email: '',
    text: '',
    nameError: false,
    emailError: false,
    textError: false,
  });

  const inputsValidation = async () => {
    if (!query.name) {
      query.nameError = true;
    }

    if (!query.text) {
      query.textError = true;
    }

    if (!query.email) {
      query.emailError = true;
    }

    setQuery({ ...query });
  };

  const doneIds: number[] = [];
  const randomId = () => {
    const result: number = Math.floor(Math.random() * 1000);

    if (doneIds.some(res => res === result)) {
      doneIds.push(result + 1000);
    } else {
      doneIds.push(result);
    }

    return result;
  };

  const commentFormCleaning = async () => {
    setQuery({
      name: '',
      email: '',
      text: '',
      nameError: false,
      emailError: false,
      textError: false,
    });
  };

  const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputsValidation();

    try {
      setCommentIsOnLoading(true);

      if (postIdComments
        && query.name
        && query.email
        && query.text) {
        const newComment: Comment = {
          id: 0,
          postId: postIdComments,
          name: query.name,
          email: query.email,
          body: query.text,
        };

        await postComment(newComment);

        newComment.id = randomId();

        const commentsArray = [...postComments, newComment];

        setPostComments(commentsArray);
        commentFormCleaning();
      }
    } catch (error) {
      throw new Error('trouble with adding a comment');
    } finally {
      setCommentIsOnLoading(false);
    }
  };

  const handleChange
  = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setQuery({
      ...query,
      [inputName]: inputValue,
      [`${inputName}Error`]: false,
    });
  };

  const handleTextareaChange
  = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery({
      ...query,
      text: event.target.value,
      textError: false,
    });
  };

  return (
    <form data-cy="NewCommentForm">
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
            className={classNames(
              'input',
              ({ 'is-danger': query.nameError }),
            )}
            value={query.name}
            onChange={handleChange}
            required
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {query.nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {query.nameError && (
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
            className={classNames(
              'input',
              ({ 'is-danger': query.emailError }),
            )}
            value={query.email}
            onChange={handleChange}
            required
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {query.emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {query.emailError && (
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
            className={classNames(
              'textarea',
              ({ 'is-danger': query.textError }),
            )}
            value={query.text}
            onChange={handleTextareaChange}
            required
          />
        </div>

        {query.textError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              ({ 'is-loading': commentIsOnLoading }),
            )}
            onClick={handleAddComment}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={commentFormCleaning}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
