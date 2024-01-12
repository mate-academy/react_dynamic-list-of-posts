import { FC, useRef, useState } from 'react';
import classNames from 'classnames';
import { createComment } from '../utils/commentService';
import { Comment } from '../types/Comment';
import { usePosts } from './PostsProvider';
import { ErrorMessage } from '../types/errors';

type Props = {
  setPostComments: (comm: Comment[]) => void;
  postComments: Comment[];
  setErrorMessage: (err: string) => void;
};

export const NewCommentForm: FC<Props>
  = ({ setErrorMessage, postComments, setPostComments }) => {
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
      nameError: null as null | ErrorMessage,
      emailError: null as null | ErrorMessage,
      commentError: null as null | ErrorMessage,
    });

    const nameRef = useRef<HTMLInputElement>(null);
    const mailRef = useRef<HTMLInputElement>(null);
    const commentRef = useRef<HTMLTextAreaElement>(null);

    const { selectedPost } = usePosts();

    function addComment({
      postId,
      name: commentName,
      email: commentEmail,
      body,
    }: Comment) {
      setErrorMessage('');
      setLoading(true);

      createComment({
        postId,
        name: commentName,
        email: commentEmail,
        body,
      })
        .then(newComment => {
          setPostComments([...postComments, newComment]);
        })
        .catch(() => {
          setErrorMessage(ErrorMessage.Something);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    const handleClear = () => {
      if (nameRef.current) {
        nameRef.current.value = '';
      }

      if (mailRef.current) {
        mailRef.current.value = '';
      }

      if (commentRef.current) {
        commentRef.current.value = '';
      }

      setErrors({
        nameError: null,
        emailError: null,
        commentError: null,
      });
    };

    const handleAdd = (event: React.FormEvent) => {
      event.preventDefault();

      if (!nameRef?.current?.value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          nameError: ErrorMessage.Name,
        }));
      }

      if (!mailRef?.current?.value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          emailError: ErrorMessage.Email,
        }));
      }

      if (!commentRef?.current?.value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          commentError: ErrorMessage.Comment,
        }));
      }

      if (!nameRef?.current?.value.trim()
        || !mailRef?.current?.value.trim()
        || !commentRef?.current?.value.trim()) {
        return;
      }

      if (selectedPost) {
        addComment({
          id: postComments.length,
          postId: selectedPost.id,
          name: nameRef?.current?.value,
          email: mailRef?.current?.value,
          body: commentRef?.current?.value,
        });
      }

      handleClear();
    };

    return (
      <form
        data-cy="NewCommentForm"
        onSubmit={handleAdd}
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
                'is-danger': errors.nameError,
              })}
              defaultValue=""
              ref={nameRef}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {errors.nameError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {errors.nameError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {errors.nameError}
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
                'is-danger': errors.emailError,
              })}
              defaultValue=""
              ref={mailRef}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {errors.emailError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {errors.emailError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {errors.emailError}
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
              className={classNames('input', {
                'is-danger': errors.commentError,
              })}
              defaultValue=""
              ref={commentRef}
            />
          </div>

          {errors.commentError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {errors.commentError}
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={classNames('button is-link',
                { 'is-loading': loading })}
            >
              Add
            </button>
          </div>
          <div className="control">
            {/* eslint-disable-next-line react/button-has-type */}
            <button
              type="reset"
              className="button is-link is-light"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    );
  };
