import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './api/fetchPosts';

export const App = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const selectedUserId = user?.id;

  useEffect(() => {
    getUsers().then(setUsersList);
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  usersList={usersList}
                  setUser={setUser}
                  user={user}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : (
                  <PostsList
                    selectedUserId={selectedUserId}
                    post={post}
                    setPost={setPost}
                  />
                )}
              </div>

              {/*    */}
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
                'Sidebar--open': post && post.userId === user?.id,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && <PostDetails post={post} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
