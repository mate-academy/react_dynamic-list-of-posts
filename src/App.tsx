import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { getUserPostsFromServer } from './api/postApi';
import { getUsersFromServer } from './api/userApi';
import { MainContent } from './components/MainContent';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { AppState } from './types/App';
import { Post } from './types/Post';
import { User } from './types/User';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [ui, setUi] = useState<AppState>({
    selectedUser: null,
    selectedPost: null,
    isLoadingPosts: false,
    postsError: false,
  });
  const updateUi = useCallback((newState: Partial<AppState>) => {
    setUi(prev => ({
      ...prev,
      ...newState,
    }));
  }, []);

  const getUsers = async () => {
    try {
      const fetchedUsers = await getUsersFromServer();

      setUsers(fetchedUsers);
    } catch {
      setUsers([]);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  async function selectUser(user: User) {
    if (!user) {
      return;
    }

    updateUi({
      selectedUser: user,
      selectedPost: null,
      postsError: false,
      isLoadingPosts: true,
    });

    try {
      const fetchedPosts = await getUserPostsFromServer(user.id);

      setPosts(fetchedPosts);
    } catch {
      updateUi({
        postsError: true,
      });
    } finally {
      updateUi({
        isLoadingPosts: false,
      });
    }
  }

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onUserSelect={selectUser}
                  selectedUser={ui.selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                <MainContent ui={ui} posts={posts} updateUi={updateUi} />
              </div>
              <></>
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
                'Sidebar--open': ui.selectedPost,
              },
            )}
          >
            {ui.selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails post={ui.selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
