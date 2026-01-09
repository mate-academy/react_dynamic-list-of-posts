import PropTypes from 'prop-types';
import { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  userList: User[];
  setSelectedUserId: (userId: number) => void;
  selectedUserId: number | null;
};

export const UserSelector = ({
  userList,
  setSelectedUserId,
  selectedUserId,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedUser = userList.find(u => u.id === selectedUserId);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i
              className={classNames('fas', {
                'fa-angle-up': isOpen,
                'fa-angle-down': !isOpen,
              })}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {userList.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUserId,
              })}
              onClick={e => {
                e.preventDefault();
                setSelectedUserId(user.id);
                setIsOpen(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

UserSelector.propTypes = {
  userList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  ).isRequired,
  setSelectedUserId: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number,
};
