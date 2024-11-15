import cn from 'classnames';
import { Comment } from '../../../types/Comment';
import { useCommentForm } from '../../../hooks/useCommentForm';

interface NewCommentFormProps {
  handleAddComment: (comment: Omit<Comment, 'id'>) => Promise<void>;
}
export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  handleAddComment,
}) => {
  const { isLoading, state, reset, handleSubmit, handleChange } =
    useCommentForm(handleAddComment);

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={state.name.value}
            onChange={handleChange}
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': state.name.error })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {state.name.error && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {state.name.error && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {state.name.error}
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
            value={state.email.value}
            onChange={handleChange}
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': state.email.error })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {state.email.error && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {state.email.error && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {state.email.error}
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
            value={state.body.value}
            onChange={handleChange}
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': state.body.error })}
          />
        </div>

        {state.body.error && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {state.body.error}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isLoading,
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
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
