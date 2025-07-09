import classNames from 'classnames';

interface FormGroupedProps {
  handleCheckCompletedData: () => void;
  hasAddCommentLoader: boolean;
  handleClear: () => void;
}

export const FormGrouped: React.FC<FormGroupedProps> = ({
  handleCheckCompletedData,
  hasAddCommentLoader,
  handleClear,
}) => {
  return (
    <div className="field is-grouped">
      <div className="control">
        <button
          type="submit"
          className={classNames('button', 'is-link', {
            'is-loading': hasAddCommentLoader,
          })}
          onClick={event => {
            event.preventDefault();
            handleCheckCompletedData();
          }}
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
  );
};
