import { useEffect, useMemo, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type UserSelectorProps = {
  users: User[];
  onSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedUserId: number | null;
  onSelectedPostId: React.Dispatch<React.SetStateAction<number | null>>;
};

export function UserSelector({
  users,
  onSelectedUserId,
  selectedUserId,
  onSelectedPostId,
}: UserSelectorProps) {
  const [isButtonTriggered, setIsButtonTriggered] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedUser: User | undefined = useMemo(() => {
    return users.find(user => user.id === selectedUserId);
  }, [selectedUserId, users]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsButtonTriggered(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={classNames('dropdown', { 'is-active': isButtonTriggered })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsButtonTriggered(!isButtonTriggered)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

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
              className={classNames('dropdown-item', {
                'is-active': selectedUserId === user.id,
              })}
              onClick={e => {
                e.preventDefault();
                onSelectedUserId(user.id);
                onSelectedPostId(null);
                setIsButtonTriggered(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
