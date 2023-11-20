import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [hasPostsError, setHasPostsError] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    client.get<User[]>('/users')
      .then((value) => setUsers(value));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setIsPostsLoading(true);
    setHasPostsError(false);

    client.get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(posts => setUserPosts(posts))
      .catch(() => setHasPostsError(true))
      .finally(() => setIsPostsLoading(false));
  }, [selectedUser]);

  const postOpenHandler = (value: Post) => {
    if (selectedPost === value) {
      return setSelectedPost(null);
    }

    return setSelectedPost(value);
  };

  const renderMainContent = () => {
    if (!selectedUser) {
      return (
        <p data-cy="NoSelectedUser">
          No user selected
        </p>
      );
    }

    if (isPostsLoading) {
      return (
        <Loader />
      );
    }

    if (hasPostsError) {
      return (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      );
    }

    if (!userPosts.length) {
      return (
        <div
          className="notification is-warning"
          data-cy="NoPostsYet"
        >
          No posts yet
        </div>
      );
    }

    return (
      <PostsList
        posts={userPosts}
        onPostOpen={postOpenHandler}
        selectedPost={selectedPost}
      />
    );
  };

  const userSelectHandler = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  users={users}
                  onSelect={userSelectHandler}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {renderMainContent()}
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
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  key={selectedPost.id}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
