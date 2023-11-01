import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
// import { PostsList } from './components/PostsList';
// import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { getUsers } from './api/users';
import { User } from './types/User';
import { getPosts } from './api/posts';
import { Post } from './types/Post';
import { PostsList } from './components/PostsList';

// import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState<User['id']>(0);

  const loadPosts = () => {
    getPosts(userId).then((postsFromServer) => setPosts(postsFromServer));
  };

  const loadUsers = () => {
    getUsers().then((usersFromserver) => setUsers(usersFromserver));
  };

  loadPosts();

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} />
              </div>

              <div className="block" data-cy="MainContent">
                <p data-cy="NoSelectedUser">No user selected</p>

                {/* <Loader /> */}

                <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  Something went wrong!
                </div>

                {posts.length === 0 ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList posts={posts} />
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
              'Sidebar--open',
            )}
          >
            <div className="tile is-child box is-success ">
              {/* <PostDetails /> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
