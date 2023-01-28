import cn from 'classnames';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { AppContext } from './Context/AppContext';

type Props = {
  users: User[]
  setLoading: (param: boolean) => void
};

export const UserSelector: React.FC<Props> = ({ users, setLoading }) => {
  const [isActive, setIsActive] = useState(false);

  const {
    formState: [,setFormOpen],
    postState: [,setPost],
    userState: [selectedUser, setUser],
  } = useContext(AppContext);

  const toggleDropdown = () => setIsActive(!isActive);
  const { id, name } = selectedUser || {};

  const onSelect = (user: User) => () => {
    if (user.id !== id) {
      setUser(user);
      setLoading(true);
      setPost(null);
    }

    toggleDropdown();
    setFormOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
          onBlur={() => setIsActive(false)}
        >
          <span>{`${name || 'Choose a user'}`}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map(user => (
            <Link
              key={user.id}
              to={`/user-${user.id}`}
              onMouseDown={onSelect(user)}
              className={cn('dropdown-item', {
                'is-active': user.id === id,
              })}
            >
              {user.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
