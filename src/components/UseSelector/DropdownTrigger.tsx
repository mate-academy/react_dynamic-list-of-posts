import { FC, useContext } from 'react';
import { Error, DropdownTriggerProps } from '../../types';
import { UserSelectorContext } from '../../context';

export const DropdownTrigger: FC<DropdownTriggerProps> = ({
  userName,
  toggleDropdown,
}) => {
  const { error } = useContext(UserSelectorContext);

  return (
    <div className="dropdown-trigger">
      <button
        type="button"
        className="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        onClick={toggleDropdown}
        disabled={error === Error.GetUsers}
      >
        <span>{userName || 'Choose a user'}</span>

        <span className="icon is-small">
          <i className="fas fa-angle-down" aria-hidden="true" />
        </span>
      </button>
    </div>
  );
};
