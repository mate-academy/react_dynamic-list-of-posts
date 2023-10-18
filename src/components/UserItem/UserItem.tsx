import { useContext } from 'react';
import classNames from 'classnames';
import { User } from '../../types/User';
import { ModalUserContext } from '../ModalUserContext';

type Props = {
  user: User;
  onActiveToggle: (isActive: boolean) => void;
};

export const UserItem: React.FC<Props> = ({ user, onActiveToggle }) => {
  const { id, name } = user;
  const { modalUser, setModalUser } = useContext(ModalUserContext);

  const handleSelectUser = () => {
    setModalUser(user);
    onActiveToggle(false);
  };

  return (
    <a
      href={`#user-${id}`}
      className={classNames('dropdown-item', {
        'is-active': modalUser?.id === id,
      })}
      key={id}
      onClick={handleSelectUser}
    >
      {name}
    </a>
  );
};
