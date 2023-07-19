import { FC } from 'react';
import { UserSelector } from './Users/UserSelector';
import { Sidebar } from './Sidebar';
import { PostList } from './Posts/PostList';
import { useUsersContext } from '../hooks/useUsersContext';

export const ListApp: FC = () => {
  const { selectedUser } = useUsersContext();

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser ? (
                  <PostList />
                ) : (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
              </div>
            </div>
          </div>

          <Sidebar />
        </div>
      </div>
    </main>
  );
};
