import { useContext } from 'react';
import { User } from '../types/User';
import { DispatchContext, StateContext } from '../utils/Store';
import classNames from 'classnames';

type Props = {
  user: User;
  setIsDropped: (x: boolean) => void;
};

export const UserComponent = ({ user, setIsDropped }: Props) => {
  const dispatch = useContext(DispatchContext);
  const { selectedUser, selectedPost } = useContext(StateContext);

  const handleSelectUser = () => {
    if (selectedPost) {
      dispatch({
        type: 'setIsPostSelected',
        payload: false,
      });
    } else {
      dispatch({
        type: 'setSelectedUser',
        payload: user,
      });
    }

    setIsDropped(false);
  };

  return (
    <div className="dropdown-content">
      <a
        href={`#user-${user.id}`}
        className={classNames('dropdown-item', {
          'is-active': user.id === selectedUser?.id,
        })}
        onMouseDown={handleSelectUser}
      >
        {user.name}
      </a>
    </div>
  );
};
