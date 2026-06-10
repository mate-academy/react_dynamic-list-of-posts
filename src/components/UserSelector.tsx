import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface Props {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelectUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // 1. Створюємо "посилання" на наш головний div
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 2. Хук, який слідкує за кліками по всьому документу
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Якщо меню відкрите, і клік відбувся НЕ всередині нашого компонента
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Закриваємо меню
      }
    };

    // Вішаємо слухача подій
    document.addEventListener('mousedown', handleClickOutside);

    // Обов'язково прибираємо слухача, коли компонент зникає
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      // 3. Прив'язуємо наш ref до головної обгортки
      ref={dropdownRef}
      className={classNames('dropdown', { 'is-active': isOpen })}
      data-cy="UserSelector"
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
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
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
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={e => {
                e.preventDefault();
                onSelectUser(user);
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
