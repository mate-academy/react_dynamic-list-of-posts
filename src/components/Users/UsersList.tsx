import React, { useContext } from 'react';
import { MainContext } from '../MainContext';
import { useOuterClick } from '../../hooks/useOuterClick';
import { UserPerson } from './UserPerson';

type Props = {
  setIsMenu: (val: boolean) => void
  setUserName: (val: string) => void
};

export const UsersList: React.FC<Props> = ({ setIsMenu, setUserName }) => {
  const { users } = useContext(MainContext);
  const reff = useOuterClick(() => setIsMenu(false));

  return (
    <div
      ref={reff}
      className="dropdown-menu"
      id="dropdown-menu"
      role="menu"
    >
      <div className="dropdown-content">
        {users?.map(user => (
          <UserPerson
            key={user.id}
            id={user.id}
            name={user.name}
            setIsMenu={setIsMenu}
            setUserName={setUserName}
          />
        ))}
      </div>
    </div>
  );
};
