import React, { useState } from 'react';
import { User } from '../types/User';
import './UserSelector.scss';
import classNames from 'classnames';

type Props = {
  users: User[];
  onChoice: (user: User) => void;
  onChangeUser: (reset: null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onChoice,
  onChangeUser,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('Choose a user');

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsMenuOpen(false);
    }
  };

  const onSelect = (event: React.MouseEvent<HTMLAnchorElement>, user: User) => {
    event.preventDefault();
    onChoice(user);
    setIsMenuOpen(false);
    setSelectedName(user.name);
    onChangeUser(null);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isMenuOpen })}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span>{selectedName}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': selectedName === user.name,
              })}
              onClick={event => onSelect(event, user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
