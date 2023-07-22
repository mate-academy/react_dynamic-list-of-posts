import React, {
  useState, useEffect,
} from 'react';

import classNames from 'classnames';
import { addComment, getAllComment } from '../api/users';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { ErrorMessage, ErrorForm } from '../types/Error';

type Props = {
  selectedPost: Post,
  postComments: Comment[],
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>
  setError: (error: ErrorMessage) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  postComments,
  setPostComments,
  setError,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [newId, setNewId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorForm, setErrorForm] = useState<ErrorForm>({
    name: false,
    email: false,
    comment: false,
  });

  useEffect(() => {
    getAllComment().then(allComments => {
      const maxId = Math.max(...allComments.map(({ id }) => id)) + 1;

      setNewId(maxId);
    });
  }, [postComments]);

  const handleClearForm = () => {
    setName('');
    setEmail('');
    setComment('');
    setError(ErrorMessage.None);
    setErrorForm({
      name: false,
      email: false,
      comment: false,
    });
  };

  const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorForm({
      name: !name,
      email: !email,
      comment: !comment,
    });

    if (!name || !email || !comment) {
      return;
    }

    if (!name.trim()) {
      setErrorForm({
        name: true,
        email: false,
        comment: false,
      });

      return;
    }

    if (!email.trim()) {
      setErrorForm({
        name: false,
        email: true,
        comment: false,
      });

      return;
    }

    if (!comment.trim()) {
      setErrorForm({
        name: false,
        email: false,
        comment: true,
      });

      return;
    }

    setLoading(true);

    const newComment = {
      id: newId,
      postId: selectedPost.id,
      body: comment,
      name,
      email,
    };

    addComment(selectedPost.id, newComment)
      .then(() => {
        setPostComments([...postComments, newComment]);
      })
      .catch(() => setError(ErrorMessage.Add))
      .finally(() => {
        setComment('');
        setName('');
        setEmail('');
        setLoading(false);
      });
  };

  const handleRemoveErrorForm = (field: string) => {
    setErrorForm({ ...errorForm, [field]: false });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleAddComment}>
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
              {
                'is-danger': errorForm.name,
              },
            )}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleRemoveErrorForm('name');
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorForm.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorForm.name && (
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
              {
                'is-danger': errorForm.email,
              },
            )}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleRemoveErrorForm('email');
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorForm.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorForm.email && (
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
              {
                'is-danger': errorForm.comment,
              },
            )}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              handleRemoveErrorForm('comment');
            }}
          />
        </div>

        {errorForm.comment && (
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
              'button is-link',
              {
                'is-loading': loading,
              },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
