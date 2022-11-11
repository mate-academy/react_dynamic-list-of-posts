import { FC } from 'react';

type Props = {
  selectedUserName: string,
  handleDropDown: () => void,
};

export const DropDownTrigger: FC<Props> = ({
  selectedUserName, handleDropDown,
}) => {
  return (
    <div className="dropdown-trigger">
      <button
        type="button"
        className="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        onClick={handleDropDown}
      >
        <span>{selectedUserName}</span>

        <span className="icon is-small">
          <i className="fas fa-angle-down" aria-hidden="true" />
        </span>
      </button>
    </div>
  );
};
