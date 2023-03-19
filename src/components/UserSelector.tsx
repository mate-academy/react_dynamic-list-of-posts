import classNames from 'classnames';
import {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current
        && !dropdownRef.current.contains(event.target as Node)) {
        setSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

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
      className={classNames(
        'dropdown',
        { 'is-active': isSelectOpen },
      )}
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

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {isSelectOpen && (
          <div className="dropdown-content" ref={dropdownRef}>
            {users.map(user => {
              const {
                id,
                name,
              } = user;

              return (
                <a
                  key={id}
                  className={classNames(
                    'dropdown-item',
                    { 'is-active': activeUserId === id },
                  )}
                  href={`#user-${id}`}
                  onClick={() => handleUserChange(id)}
                >
                  {name}
                </a>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
