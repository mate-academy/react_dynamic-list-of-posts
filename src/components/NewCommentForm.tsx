import { FC, useRef, useState } from 'react';
import classNames from 'classnames';
import { createComment } from '../utils/commentService';
import { Comment } from '../types/Comment';
import { usePosts } from './PostsProvider';

type Props = {
  setPostComments: (comm: Comment[]) => void;
  postComments: Comment[];
  setErrorMessage: (err: string) => void;
};

export const NewCommentForm: FC<Props>
  = ({ setErrorMessage, postComments, setPostComments }) => {
    const [name, setName] = useState('');
    const [hasNameError, setHasNameError] = useState(false);
    const [email, setEmail] = useState('');
    const [hasEmailError, setHasEmailError] = useState(false);
    const [comment, setComment] = useState('');
    const [hasCommentError, setHasCommentError] = useState(false);
    const [loading, setLoading] = useState(false);

    const nameRef = useRef<HTMLInputElement | null>(null);
    const mailRef = useRef<HTMLInputElement | null>(null);
    const commentRef = useRef<HTMLTextAreaElement | null>(null);

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
          setComment('');
        })
        .catch(() => {
          setErrorMessage('Something went wrong!');
        })
        .finally(() => {
          setLoading(false);
        });
    }

    const handleClear = () => {
      setName('');
      setEmail('');
      setComment('');
    };

    const handleAdd = (event: React.FormEvent) => {
      event.preventDefault();

      setHasNameError(!nameRef?.current?.value.trim());
      setHasEmailError(!mailRef?.current?.value.trim());
      setHasCommentError(!commentRef?.current?.value.trim());

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
                'is-danger': hasNameError,
              })}
              defaultValue={name}
              ref={nameRef}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {hasNameError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {hasNameError && (
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
                'is-danger': hasEmailError,
              })}
              defaultValue={email}
              ref={mailRef}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {hasEmailError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {hasEmailError && (
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
              className={classNames('input', {
                'is-danger': hasCommentError,
              })}
              defaultValue={comment}
              ref={commentRef}
            />
          </div>

          {hasCommentError && (
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
