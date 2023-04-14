import React, { useState, useEffect } from 'react';

import { getUsers } from '../../api/user';

import { UserSelector } from '../UserSelector';
import { Loader } from '../Loader';
import { PostsList } from '../PostsList';

import { User } from '../../types/User';
// import { Post } from '../../types/Post';
import { LoadStage } from '../../types/LoadStage';

export const PostContent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  // const [posts, setPosts] = useState<Post[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [loadStage, setLoadStage]
    = useState<LoadStage>(LoadStage.Uninitialized);

  useEffect(() => {
    setLoadStage(LoadStage.Loading);

    getUsers()
      .then(setUsers)
      .then(
        () => setLoadStage(LoadStage.Success),
        () => setLoadStage(LoadStage.Error),
      );
  }, []);

  const hanleUserSelect = (newUser: User) => setSelectedUser(newUser);

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
        {loadStage === LoadStage.Loading && (
          <Loader />
        )}

        {loadStage === LoadStage.Error && (
          <div
            className="notification is-danger"
            data-cy="PostsLoadingError"
          >
            Something went wrong!
          </div>
        )}

        {loadStage === LoadStage.Success
          && users.length > 0
          && !selectedUser
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

        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>

        <PostsList />
      </div>
    </div>
  );
};
