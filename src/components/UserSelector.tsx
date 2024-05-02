import React, { useEffect, useRef, useState } from 'react';
import { getAllUsers } from '../api/users';
import { User } from '../types/User';

type Props = {
  onSelectUser: (value: User) => void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  onSelectUser,
  selectedUser,
}) => {
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [userList, setUserList] = useState<User[] | null>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAllUsers().then(res => {
      setUserList(res);
    });
  }, []);

  /* event.target.className !== 'button' || */

  useEffect(() => {
    const closeDropDown = (e: any) => {
      if (
        dropDownVisible &&
        coverRef.current &&
        !coverRef.current?.contains(e.target)
      ) {
        setDropDownVisible(false);
      }
    };

    document.addEventListener('click', closeDropDown);

    return () => removeEventListener('click', closeDropDown);
  }, [dropDownVisible]);

  const handleSelect = (user: User) => {
    onSelectUser(user);
    setDropDownVisible(false);
  };

  return (
    <div
      ref={coverRef}
      data-cy="UserSelector"
      className={`dropdown ${dropDownVisible && 'is-active'}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropDownVisible(prevState => !prevState)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {userList &&
            userList.map(user => (
              <a
                href={`#${user.id}`}
                className={`dropdown-item ${selectedUser?.id === user.id && 'is-active'}`}
                key={user.id}
                onClick={() => handleSelect(user)}
              >
                {user.name || 'no name'}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
