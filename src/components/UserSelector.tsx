import React, { useMemo, useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';

interface Props {
  users: User[],
  selectedUserID: number,
  setSelectedUserID: (id: number) => void,
  setSelectedPostID: (id: number) => void,
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserID,
  setSelectedUserID,
  setSelectedPostID,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedUser = useMemo(
    () => users.find(({ id }) => id === selectedUserID),
    [selectedUserID, users],
  );

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
        >
          <span>
            {selectedUserID ? selectedUser?.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(({ id, name }) => (
              <a
                key={id}
                href={`#user-${id}`}
                className={cn(
                  'dropdown-item', { 'is-active': id === selectedUserID },
                )}
                onClick={() => {
                  setSelectedUserID(id);
                  setSelectedPostID(0);
                  setIsOpen(false);
                }}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
