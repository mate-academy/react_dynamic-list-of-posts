import { useEffect, useState } from 'react';
import { getUsers } from '../api/users/postsApi';
import { Post, User } from '../types/interfaces';

export const useUser = (
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await getUsers();

        setUsers(result);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    loadUsers();
  }, []);

  const handleSelectUser = (id: number) => {
    const result = users.find(user => user.id === id);

    setSelectedUser(result || null);

    setIsOpenSidebar(false);
    setSelectedPost(null);
  };

  return {
    users,
    selectedUser,
    handleSelectUser,
  };
};
