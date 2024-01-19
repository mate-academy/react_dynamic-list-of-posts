import React, { useContext } from 'react';
import { PostsContext } from '../../PostsContext';
import { Load } from '../../types/Load';

type Props = {
  setIsMenu: (val: boolean) => void
  setUserName: (val: string) => void
};

export const UsersList: React.FC<Props> = ({ setIsMenu, setUserName }) => {
  const {
    users,
    currentUser,
    setCurrentUser,
    setComments,
    setLoadType,
    setCurrentPost,
    setNotification,
  } = useContext(PostsContext);

  const handleClick = (id: number, name: string) => {
    if (id === currentUser) {
      setIsMenu(false);

      return;
    }

    setLoadType(Load.Posts);
    setIsMenu(false);
    setComments([]);
    setNotification('');
    setCurrentPost(null);
    setUserName(name);
    setCurrentUser(id);
  };

  return (
    <div className="dropdown-menu" id="dropdown-menu" role="menu">
      <div className="dropdown-content">
        {users?.map(user => (
          <a
            key={user.id}
            href={`#user-${user.id}`}
            className="dropdown-item"
            onClick={() => handleClick(user.id, user.name)}
          >
            {user.name}
          </a>
        ))}
      </div>
    </div>
  );
};
