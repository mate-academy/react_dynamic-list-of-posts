import {
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { DropdownMenu, DropdownTrigger } from './components';
import { UserSelectorContext } from '../../context';
import {
  User,
  Error,
  Loading,
  UserSelectorProps,
} from '../../types';
import { getUsersFromServer, getPostsFromServer } from '../../api';

export const UserSelector: React.FC<UserSelectorProps> = ({
  setError,
  setPosts,
  setLoading,
  setCurrentPost,
  setCurrentUserId,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { currentUserId } = useContext(UserSelectorContext);

  const getUsers = async () => {
    try {
      const data = await getUsersFromServer();

      setUsers(data);
    } catch {
      setError(Error.GetUsers);
    }
  };

  const getPosts = async (userId: number) => {
    setLoading(Loading.Posts);
    setError(Error.None);
    setCurrentPost(null);

    try {
      const data = await getPostsFromServer(userId);

      setPosts(data);
    } catch {
      setError(Error.GetPosts);
    } finally {
      setLoading(Loading.None);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSelect = useCallback(event => {
    const trigger = event.target.closest('.dropdown-trigger');
    const item = event.target.matches('.dropdown-item');

    if (!isOpen) {
      return;
    }

    if (trigger || item) {
      return;
    }

    setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('click', handleSelect);

    return () => {
      document.removeEventListener('click', handleSelect);
    };
  }, [isOpen]);

  const selectUser = (id: number) => {
    setCurrentUserId(id);
    getPosts(id);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const userName = users.find(({ id }) => id === currentUserId)?.name;

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
    >

      <DropdownTrigger
        userName={userName || ''}
        toggleDropdown={toggleDropdown}
      />

      <DropdownMenu
        users={users}
        selectUser={selectUser}
      />
    </div>
  );
};
