import React, { useContext } from 'react';
import { NotificationContent } from '../../Context/NotificationManager';
import { CurrentPostContext } from '../../Context/CurrentPostContext';
import { CurrentUserContext } from '../../Context/CurrentUserContext';
import { UserSelector } from '../UserSelector';
import { Loader } from '../Loader';
import { Notif } from '../Notif';
import { PostsList } from '../PostList';
import classNames from 'classnames';
import { PostDetails } from '../PostDetails';
import { SidebarContext } from '../../Context/SidebarContext';
import { UserPostsContext } from '../../Context/UserPostsContext';
import { UserListContext } from '../../Context/UserListContext';
import { IsFormProvider } from '../../Context/IsForm';

export const AppContent: React.FC = () => {
  const { users } = useContext(UserListContext);

  const { notificationState } = useContext(NotificationContent);
  const { selectedPost } = useContext(CurrentPostContext);
  const { selectedUser } = useContext(CurrentUserContext);
  const { isSidebar } = useContext(SidebarContext);

  const { userPosts, postLoader, onUserPostList } =
    useContext(UserPostsContext);

  const isUserLoadingError =
    (notificationState.alarm || notificationState.error) &&
    notificationState.source === 'Userloading';

  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <div className="tile is-child box is-success">
          <div className="block">
            <UserSelector users={users} handleSelectUser={onUserPostList} />
          </div>

          <div className="block" data-cy="MainContent">
            {!selectedUser && <p data-cy="NoSelectedUser">No user selected</p>}

            {postLoader && <Loader />}

            {isUserLoadingError ? (
              <Notif />
            ) : (
              selectedUser && userPosts.length > 0 && <PostsList />
            )}
          </div>
        </div>
      </div>

      <div
        data-cy="Sidebar"
        className={classNames('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
          'Sidebar--open': isSidebar,
        })}
      >
        {selectedPost && (
          <div className="tile is-child box is-success ">
            <IsFormProvider>
              <PostDetails />
            </IsFormProvider>
          </div>
        )}
      </div>
    </div>
  );
};
