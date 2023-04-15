import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';

import { getUsers10 } from '../../api/user';

import { PostContext } from '../../contexts/PostContext';
import { UserSelector } from '../UserSelector';
import { PostsList } from '../PostsList';

import { User } from '../../types/User';
import { LoadStage } from '../../types/LoadStage';

export const PostContent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadStage, setLoadStage] = useState(LoadStage.Uninitialized);

  const { setPost } = useContext(PostContext);

  useEffect(() => {
    setLoadStage(LoadStage.Loading);

    getUsers10()
      .then(setUsers)
      .then(
        () => setLoadStage(LoadStage.Success),
        () => setLoadStage(LoadStage.Error),
      );
  }, []);

  const hanleUserSelect = useCallback((newUser: User) => {
    setSelectedUser(newUser);
    setPost(null);
  }, []);

  return (
    <div className="tile is-child box is-success">
      <div className="block">
        <UserSelector
          users={users}
          selectedUser={selectedUser}
          onUserSelect={hanleUserSelect}
        />
      </div>

      <div className="block" data-cy="MainContent">
        {loadStage === LoadStage.Error && (
          <div
            className="notification is-danger"
            data-cy="PostsLoadingError"
          >
            Something went wrong!
          </div>
        )}

        {!selectedUser
          && (
            <p data-cy="NoSelectedUser">
              No user selected
            </p>
          )}

        {loadStage === LoadStage.Success && !users.length && (
          <div className="notification is-warning">
            No users on server
          </div>
        )}

        {selectedUser && (
          <PostsList selectedUserId={selectedUser.id} />
        )}
      </div>
    </div>
  );
};
