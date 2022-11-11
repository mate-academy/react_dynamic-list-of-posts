import { FC, memo } from 'react';
import classNames from 'classnames';

type Props = {
  shouldClear: string,
  handleReset: () => void,
  isLoading: boolean,
};

export const FormButtons: FC<Props> = memo(({
  shouldClear, handleReset, isLoading,
}) => {
  return (
    <div className="field is-grouped">
      <div className="control">
        <button
          type="submit"
          className={classNames(
            'button is-link',
            { 'is-loading': isLoading },
          )}
        >
          Add
        </button>
      </div>

      <div className="control">
        {shouldClear && (
          <button
            aria-label="reset"
            type="button"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
});
