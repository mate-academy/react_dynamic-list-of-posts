import classNames from 'classnames';
import { FC, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  activeUserId: number;
  onUserChange: (id: number) => void;
};

export const UserSelector: FC<Props> = ({
  users,
  activeUserId,
  onUserChange,
}) => {
  const [isSelectOpen, setSelectOpen] = useState(false);

  const handleSelect = () => {
    setSelectOpen(prev => !prev);
  };

  const handleUserChange = (id: number) => {
    onUserChange(id);
    handleSelect();
  };

  const activeUser = users.find(user => user.id === activeUserId);

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
          onClick={handleSelect}
        >
          <span>{activeUser?.name ?? 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      {isSelectOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              const {
                id,
                name,
              } = user;

              return (
                <a
                  key={id}
                  href={`#user-${id}`}
                  className={classNames(
                    'dropdown-item',
                    { 'is-active': activeUserId === id },
                  )}
                  onClick={() => handleUserChange(id)}
                >
                  {name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
