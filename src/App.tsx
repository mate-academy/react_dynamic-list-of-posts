import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { Post, User } from './types';
import { getPosts, getUsers } from './api/dataFromServer';
import { Errors } from './components/Errors';
import { ErrorsDataCy } from './types/ErrorsDataCy';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [usersPosts, setUsersPost] = useState<Post[]>([]);
  const [loadPostError, setLoadPostError] = useState(ErrorsDataCy.Default);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleSelectedUser = async (user: User) => {
    setSelectedPost(null);
    setIsLoadingPosts(true);

    try {
      setSelectedUser(user);
      const posts = await getPosts(user.id);

      setUsersPost(posts);
    } catch {
      setLoadPostError(ErrorsDataCy.PostsLoadingError);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const isPostsShown = !isLoadingPosts && selectedUser && !loadPostError;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  onChangeSelectedUser={handleSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {loadPostError && <Errors dataCy={loadPostError} />}

                {!usersPosts.length && isPostsShown && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {usersPosts.length > 0 && isPostsShown && (
                  <PostsList
                    posts={usersPosts}
                    selectedPost={selectedPost}
                    onSelectedPost={setSelectedPost}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
