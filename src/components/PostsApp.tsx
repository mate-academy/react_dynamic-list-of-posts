import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { AppContext, AppDispatchContext } from './AppState';
import { UserSelector } from './UserSelector';
import { getUsers } from '../api/users';
import { PostsList } from './PostsList';
import { PostDetails } from './PostDetails';
import { ActionType } from '../types';

export const PostsApp: React.FC = () => {
  const { selectedUser, selectedPost } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  useEffect(() => {
    getUsers().then(users =>
      dispatch({ type: ActionType.SetUsers, payload: users }),
    );
  }, [dispatch]);

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
                  <PostsList />
                ) : (
                  <p data-cy="NoSelectedUser"> No user selected </p>
                )}
              </div>
            </div>
          </div>
          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': selectedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
