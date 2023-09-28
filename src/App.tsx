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
import { Post } from './types/Post';
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isCommentButtonClicked, setIsCommentButtonClicked] = useState(false);

  const displayNoPostsMessage = !posts.length
  && selectedUser
  && !errorMessage
  && !isLoading;

  const getAllUsers = () => {
    return client.get<User[]>('/users');
  };

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch(() => setErrorMessage('Error loading users'));
  }, []);

  const getUserPosts = () => {
    return client.get<Post[]>(`/posts?userId=${selectedUser?.id}`);
  };

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      getUserPosts()
        .then(postsFromServer => {
          if (postsFromServer) {
            setPosts(postsFromServer);
          }
        })
        .catch(() => setErrorMessage('Error loading posts'))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  const selectedPostHandler = (post: Post) => {
    if (post !== selectedPost) {
      setSelectedPost(post);
      setIsCommentButtonClicked(false);
    } else {
      setSelectedPost(null);
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  isDropdownActive={isDropdownActive}
                  setIsDropdownActive={setIsDropdownActive}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && (
                  <Loader />
                )}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {displayNoPostsMessage && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {(posts.length > 0
                  && selectedUser
                  && !isLoading
                ) && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPostHandler={selectedPostHandler}
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >

            {selectedPost !== null && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  isCommentButtonClicked={isCommentButtonClicked}
                  setIsCommentButtonClicked={setIsCommentButtonClicked}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
