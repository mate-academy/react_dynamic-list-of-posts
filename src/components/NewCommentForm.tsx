import {
  Dispatch,
  SetStateAction,
  useState,
  FC,
  ChangeEvent,
  FormEvent,
} from 'react';
import cn from 'classnames';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

const { post: clientPost } = client;

const initialNewComment = {
  name: '',
  email: '',
  body: '',
};

const initialNewCommentError = {
  name: false,
  email: false,
  body: false,
};

interface Props {
  postId: number;
  setComments: Dispatch<SetStateAction<Comment[]>>;
}

export const NewCommentForm: FC<Props> = ({ postId, setComments }) => {
  const [newComment, setNewComment] = useState(initialNewComment);
  const [isLoading, setIsLoading] = useState(false);

  const [newCommentError, setNewCommentError] = useState(
    initialNewCommentError,
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setNewComment(prev => ({
      ...prev,
      [name]: value,
    }));

    setNewCommentError(prev => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleReset = () => {
    setNewComment(initialNewComment);
    setNewCommentError(initialNewCommentError);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const fields = Object.keys(newComment) as Array<keyof typeof newComment>;

    fields.forEach(field => {
      if (!newComment[field].trim()) {
        setNewCommentError(prev => ({
          ...prev,
          [field]: true,
        }));
      }
    });

    if (Object.values(newComment).some(value => !value.trim())) {
      return;
    }

    setIsLoading(true);

    clientPost<Comment>('/comments', {
      ...newComment,
      postId,
    })
      .then(response =>
        setComments(prevComments => [...prevComments, response]),
      )
      .finally(() => {
        setIsLoading(false);
        setNewComment(prev => ({
          ...prev,
          body: '',
        }));
        setNewCommentError(initialNewCommentError);
      });
  };

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
            className={cn('input', { 'is-danger': newCommentError.name })}
            value={newComment.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {newCommentError.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {newCommentError.name && (
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
            className={cn('input', { 'is-danger': newCommentError.email })}
            value={newComment.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {newCommentError.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {newCommentError.email && (
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
            className={cn('textarea', { 'is-danger': newCommentError.body })}
            value={newComment.body}
            onChange={handleChange}
          />
        </div>

        {newCommentError.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            aria-label="clear"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
