import {
  FC,
  memo,
} from 'react';

import classNames from 'classnames';

type Props = {
  isLoading: boolean;
  shouldClear: string;
  handleReset: () => void;
};

export const FormButtons: FC<Props> = memo(({
  isLoading,
  shouldClear,
  handleReset,
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
            type="button"
            className="button is-link is-light"
            aria-label="reset"
            onClick={handleReset}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
});
