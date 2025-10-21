import React, { useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';
import PropTypes from 'prop-types';

type Props = {
  users: User[];
  selectedUser: User | null;
  onSelected: (user: User | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  //#region Handlers
  const handleDropdownToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(prev => !prev);
  };

  const handlePick = (user: User) => {
    setIsOpen(false);
    onSelected(user);
  };

  const handleBlurChange = () => {
    setIsOpen(false);
  };
  //#endregion

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownToggle}
          onBlur={handleBlurChange}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onMouseDown={() => handlePick(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const UserShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
});

const UserValidator = UserShape as unknown as PropTypes.Validator<User>;
const NullableUserValidator = PropTypes.oneOfType([
  UserShape,
  PropTypes.oneOf([null]),
]) as unknown as PropTypes.Validator<User | null | undefined>;

UserSelector.propTypes = {
  users: PropTypes.arrayOf(UserValidator)
    .isRequired as unknown as PropTypes.Validator<User[]>,
  selectedUser: NullableUserValidator,
  onSelected: PropTypes.func.isRequired,
};
