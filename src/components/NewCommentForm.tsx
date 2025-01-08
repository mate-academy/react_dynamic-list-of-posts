import React, { useCallback, useState, FormEvent } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  postId: number;
  addComment: (newComment: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = React.memo(({ postId, addComment }) => {


  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [newComment, setNewComment] = useState<Comment>({
    id: Date.now() + Math.floor(Math.random() * 1000),
    postId,
    name: "",
    email: "",
    body: "",
  });
  const [fieldsError, setFieldsError] = useState({
    name: false,
    email: false,
    body: false,
  });


  const handleChange = useCallback(
    (field: keyof Comment, value: string) => {
      setNewComment(prev => ({ ...prev, [field]: value }));
    },
    []);


  const handleResetForm = useCallback(() => {
    setNewComment({
      id: 0,
      postId,
      name: "",
      email: "",
      body: "",
    });

    setFieldsError({
      name: false,
      email: false,
      body: false,
    });
  }, [postId]);


  const handleSubmitForm = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    const errors = {
      name: !newComment.name.length,
      email: !newComment.email.length,
      body: !newComment.body.length,
    };

    setFieldsError(errors);

    if (!errors.name && !errors.email && !errors.body) {
      setIsLoadingButton(true);

      try {
        await client
          .post('/comments', { ...newComment });
        addComment(newComment);
        setNewComment(prev => ({
          ...prev,
          id: Date.now() + Math.floor(Math.random() * 1000),
          body: "",
        }))
      } catch (err) {
        console.error('Failed to submit comment:', err);
      } finally {
        setIsLoadingButton(false)
      }
    }
  }, [newComment, handleResetForm]);


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
            className={cn("input", { "is-danger": fieldsError.name })}
            value={newComment.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {fieldsError.name &&
            (<span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
            )}
        </div>

        {fieldsError.name &&
          (<p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>)
        }
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
            className={cn("input", { "is-danger": fieldsError.email })}
            value={newComment.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {fieldsError.email &&
            (<span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>)
          }
        </div>

        {fieldsError.email &&
          (<p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>)
        }
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
            className={cn("input", { "is-danger": fieldsError.body })}
            value={newComment.body}
            onChange={(e) => handleChange("body", e.target.value)}
          />
        </div>

        {fieldsError.body &&
          (<p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>)
        }
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className={cn("button is-link", { "is-loading": isLoadingButton })}>
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light" onClick={handleResetForm}>
            Clear
          </button>
        </div>
      </div>
    </form>
  );
});
