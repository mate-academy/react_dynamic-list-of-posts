import { User } from '../types/User';
import { useState, useRef, useEffect } from 'react';

export interface Props {
  users: User[];
  selectedUser: User | null;
  handleSelectUser: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  handleSelectUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // перевіряємо, куди клікнув юзер
    const handleClickOutside = (event: MouseEvent) => {
      // чи був цей клік поза компонентом
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // якщо так —> setIsOpen(false)
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // видаляє слухач, якщо компонент видаляється або закривається//.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={`dropdown-item ${selectedUser?.id === user.id ? 'is-active' : ''}`}
              onClick={event => {
                event.preventDefault(); // Запобігаємо зайвому стрибку сторінки за якорем
                handleSelectUser(user);
                // закриваємо меню після вибору юзера
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
