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
import { getUsers } from './components/api/users';
import { Post } from './types/Post';
import { getPosts } from './components/api/posts';

export const App: React.FC = () => {
  const [usersFroServer, setUsersFromServer] = useState<User[] | []>([]);
  const [
    selectedUser, setSelectedUser,
  ] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showPostsList, setShowPostsList] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers().then((data) => {
      setUsersFromServer(data);
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error loading users:', error);
      setIsError(true);
    });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setShowPostsList(false);
      setIsLoading(true);
      getPosts(selectedUser.id).then((data) => {
        setUserPosts(data);
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Something went wrong!', error);
        setIsError(true);
      }).finally(() => {
        setIsLoading(false);
        setShowPostsList(true);
      });
    }
  }, [selectedUser]);

  const renderContent = () => {
    let content = null;

    if (!selectedUser) {
      content = (
        <p data-cy="NoSelectedUser">
          No user selected
        </p>
      );
    }

    if (isLoading) {
      content = (
        <Loader />
      );
    }

    if (isError) {
      content = (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      );
    } else if (showPostsList) {
      if (userPosts.length === 0) {
        content = (
          <div className="notification is-warning" data-cy="NoPostsYet">
            No posts yet
          </div>
        );
      } else {
        content = (
          <PostsList
            userPosts={userPosts}
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
          />
        );
      }
    }

    return content;
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={usersFroServer}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {renderContent()}
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
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
