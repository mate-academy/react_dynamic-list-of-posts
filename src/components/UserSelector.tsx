import React, { useState } from 'react';
import { User } from '../types/User';


type Props = {
  users: User[],
  chooseUser: (value: number) => void,
  setChoosePost: (value: boolean) => void,
}

export const UserSelector: React.FC<Props> = ({
  users,
  chooseUser,
  setChoosePost,
}) => {

  const [isUsers, setIsUsers] = useState(false);
  const [userName, setUserName] = useState('Choose a user');

  const choose = (e: React.MouseEvent<HTMLAnchorElement>, id: number, name: string) => {
    e.preventDefault()
    chooseUser(id);
    setUserName(name);
    setChoosePost(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
      onClick={() => setIsUsers(!isUsers)}

    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            {userName}
          </span>

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
        {isUsers && (
          <div className="dropdown-content">
            {users.map((user) => (
              <a
                href={`${user.id}#user-${user.id}`}
                className="dropdown-item"
                key={user.id}
                onClick={(e) => choose(e,user.id, user.name)}

              >
                {user.name}
              </a>
            ))}
            {/* <a href="#user-2" className="dropdown-item is-active">Ervin Howell</a>
            <a href="#user-3" className="dropdown-item">Clementine Bauch</a>
            <a href="#user-4" className="dropdown-item">Patricia Lebsack</a>
            <a href="#user-5" className="dropdown-item">Chelsey Dietrich</a> */}
          </div>
        )}

      </div>
    </div>
  );
};
