/* eslint-disable no-unneeded-ternary */
import React from 'react';

type Props = {
  onClick: () => void;
  selectedUserName: string | undefined;
};

export const DropdownTrigger: React.FC<Props> = (
  { onClick, selectedUserName },
) => (
  <div className="dropdown-trigger">
    <button
      type="button"
      className="button"
      aria-haspopup="true"
      aria-controls="dropdown-menu"
      onClick={onClick}
    >
      <span>
        {selectedUserName ? selectedUserName : 'Choose a user'}
      </span>

      <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true" />
      </span>
    </button>
  </div>
);
