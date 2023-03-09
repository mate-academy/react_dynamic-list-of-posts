import {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { UserSelector } from '../UserSelector';
import { PostsList } from '../PostList';

import { PostDetails } from '../PostDetails';
import { IUser } from '../../types/IUser';
import { IPost } from '../../types/IPost';
import { getUsers } from '../../api/users';

export const Main: FunctionComponent = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  useEffect(() => {
    const getUsersFromServer = async () => {
      try {
        const loadUsers = await getUsers();

        return setUsers(loadUsers);
      } catch (err) {
        throw Error('Unable to load users');
      }
    };

    getUsersFromServer();
  }, []);

  const handleSelectUser = useCallback((user: IUser | null) => {
    setSelectedUser(user);
  }, []);

  const handleSelectPost = useCallback((post: IPost | null) => {
    setSelectedPost(post);
  }, []);

  return (
    <div className="container">
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <div className="tile is-child box is-success">
            <div className="block">
              <UserSelector
                users={users}
                selectedUser={selectedUser}
                handleSelectUser={handleSelectUser}
              />
            </div>

            <div className="block" data-cy="MainContent">
              {!selectedUser ? (
                <p data-cy="NoSelectedUser">
                  No user selected
                </p>
              ) : (
                <PostsList
                  selectedUser={selectedUser}
                  selectedPost={selectedPost}
                  handleSelectPost={handleSelectPost}
                />
              )}
            </div>
          </div>
        </div>

        <div
          data-cy="Sidebar"
          className={classNames(
            'tile',
            'is-parent',
            'is-8-desktop',
            'Sidebar',
            {
              'Sidebar--open': selectedPost,
            },
          )}
        >
          <div className="tile is-child box is-success ">
            {selectedPost && (
              <PostDetails selectedPost={selectedPost} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
