import { User } from '../types/User';
import { useContext } from 'react';
import { PostsContext } from '../services/Store';
import classNames from 'classnames';

type Props = {
  user: User;
};

export const UserItem: React.FC<Props> = ({ user }) => {
  const { setSelectedUserId, setSelectedPostId, selectedUserId } =
    useContext(PostsContext);

  return (
    <>
      <a
        href={`#user-${user.id}`}
        className={classNames('dropdown-item', {
          'is-active': selectedUserId === user.id,
        })}
        onClick={() => {
          setSelectedUserId(user.id);
          setSelectedPostId(null);
        }}
      >
        {user.name}
      </a>
    </>
  );
};
