import classNames from 'classnames';
import React, {
  Dispatch, SetStateAction, useState,
} from 'react';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

type Props = {
  selectedPost: Post,
  comments: Comment[],
  onAdd: (comment: Comment) => void;
  loading: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  comments,
  onAdd,
  loading,
}) => {
  const [name, setName] = useState('');
  const [nameVisited, setNameVisited] = useState(false);

  const [email, setEmail] = useState('');
  const [emailVisited, setEmailVisited] = useState(false);

  const [body, setBody] = useState('');
  const [commentVisited, setCommentVisited] = useState(false);

  const [newCommentId, setNewCommentId] = useState(0);

  const handleBlur = (
    fieldValue: string,
    setFieldVisited: Dispatch<SetStateAction<boolean>>,
  ) => {
    if (!fieldValue.trim()) {
      setFieldVisited(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
    setFieldValue: Dispatch<SetStateAction<string>>,
    setFieldVisited: Dispatch<SetStateAction<boolean>>,
  ) => {
    setFieldVisited(true);
    setFieldValue(e.target.value);
  };

  const handleError = (
    fieldValue: string,
    fieldVisited: boolean,
  ) => {
    return ((fieldValue.length === 0) && fieldVisited);
  };

  const resetError = (
    setFieldValue: Dispatch<SetStateAction<string>>,
    setFieldVisited: Dispatch<SetStateAction<boolean>>,
  ) => {
    setFieldValue('');
    setFieldVisited(false);
  };

  const handleNewCommentId = (postId: number) => {
    const postComments = comments.filter(note => note.postId === postId);
    const maxCommentId = Math.max(...postComments.map(el => el.id));

    setNewCommentId(maxCommentId + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNewCommentId(selectedPost.id);

    if (!name.trim() || !email.trim() || !body.trim()) {
      setNameVisited(true);
      setEmailVisited(true);
      setCommentVisited(true);

      return;
    }

    onAdd({
      id: newCommentId,
      name,
      email,
      body,
      postId: selectedPost.id,
    });

    setBody('');
    setCommentVisited(false);
  };

  const clearSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    resetError(setName, setNameVisited);
    resetError(setEmail, setEmailVisited);
    resetError(setBody, setCommentVisited);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={clearSubmit}
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
            className={classNames('input', {
              'is-danger': handleError(name, nameVisited),
            })}
            value={name}
            onChange={(e) => handleChange(e, setName, setNameVisited)}
            onBlur={() => handleBlur(name, setNameVisited)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {handleError(name, nameVisited) && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            </>
          )}
        </div>

        {handleError(name, nameVisited) && (
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
              'is-danger': handleError(email, emailVisited),
            })}
            value={email}
            onChange={(e) => handleChange(e, setEmail, setEmailVisited)}
            onBlur={() => handleBlur(email, setEmailVisited)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {handleError(email, emailVisited) && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            </>
          )}
        </div>

        {handleError(email, emailVisited) && (
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
              'is-danger': handleError(body, commentVisited),
            })}
            value={body}
            onChange={(e) => handleChange(e, setBody, setCommentVisited)}
            onBlur={() => handleBlur(body, setCommentVisited)}
          />
        </div>

        {handleError(body, commentVisited) && (
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
              'is-loading': loading,
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
