import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { FormError } from './FormError';
import { Comment, CommentData } from '../../../../../../types/Comment';
import { checkErrors, checkFormFiels } from '../../../../../../utils/utils';
import { postsContext } from '../../../../../../context/Store';
import { addComment } from '../../../../../../api/comments';
import { ErrorText } from '../../../../../../types/ErrorText';
import { initialValue } from '../../../../../../conts';
import { ComntContext } from '../../../../../../context/ComntComtext';
type Props = {
  onError: (v: ErrorText) => void;
  loading: boolean;
  updateLoading: (v: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = React.memo(
  ({ onError, loading, updateLoading }) => {
    const [formError, setFormError] = useState<CommentData>({
      name: '',
      email: '',
      body: '',
    });
    const [commentData, setCommentData] = useState<CommentData>({
      name: '',
      email: '',
      body: '',
    });
    const { setComments } = useContext(ComntContext);
    const { state } = useContext(postsContext);
    const { selectedPost } = state;
    const { name, email, body } = commentData;

    const onChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: keyof CommentData,
    ) => {
      setCommentData(oldData => ({ ...oldData, [field]: e.target.value }));
      setFormError(oldErrors => ({ ...oldErrors, [field]: '' }));
    };

    const reset = () => {
      setCommentData(initialValue);
      setFormError(initialValue);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const errors = checkFormFiels(commentData);

      setFormError(errors);
      updateLoading(true);

      if (checkErrors(errors)) {
        const newComment: Omit<Comment, 'id'> = {
          postId: selectedPost ? selectedPost.id : 0,
          name,
          email,
          body,
        };

        addComment(newComment)
          .then(comment => {
            setComments(prevComments => [...prevComments, comment]);
          })
          .catch(error => {
            onError(ErrorText.failLoad);
            throw new Error(error);
          })
          .then(() => {
            setCommentData(oldData => ({ ...oldData, body: '' }));
          })
          .finally(() => {
            updateLoading(false);
          });
      } else {
        updateLoading(false);
      }
    };

    return (
      <form data-cy="NewCommentForm" onSubmit={onSubmit} autoComplete="off">
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
              className={classNames('input ', {
                'is-danger': formError.name,
              })}
              value={commentData.name}
              onChange={e => onChange(e, 'name')}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {formError.name && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {formError.name && <FormError errorMessage={formError.name} />}
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
              className={classNames('input ', {
                'is-danger': formError.email,
              })}
              value={commentData.email}
              onChange={e => onChange(e, 'email')}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {formError.email && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {formError.email && <FormError errorMessage={formError.email} />}
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
                'is-danger': formError.body,
              })}
              value={commentData.body}
              onChange={e => onChange(e, 'body')}
            />
          </div>

          {formError.body && <FormError errorMessage={formError.body} />}
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
            <button
              type="reset"
              className="button is-link is-light"
              onClick={reset}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    );
  },
);

NewCommentForm.displayName = 'NewCommentForm';
