import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo/UserInfo';
import { SelectComponent } from '../SelectComponent/SelectComponent';

interface Props {
  users: User[];
  onUserSelect: (user: User) => void
}

export const UserSelector: FC<Props> = (props) => {
  const { users, onUserSelect } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState('Choose a user');
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!dropdown.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  const handleSelect = useCallback((user: User) => {
    onUserSelect(user);
    setIsOpen(false);
    setCurrentUser(user.name);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      ref={dropdown}
      className={cn('dropdown', {
        'is-active': isOpen,
      })}
    >

      <SelectComponent
        currentUserName={currentUser}
        onOpen={handleOpen}
      />

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map(user => (
            <UserInfo
              key={user.id}
              user={user}
              currentUserName={currentUser}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
