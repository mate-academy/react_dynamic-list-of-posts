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
import { getAllPosts, getAllUsers } from './utils/fetchClient';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [postsLoadingError, setPostsLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSelectUser = async (user: User) => {
    setSelectedUser(user);
    setIsLoading(true);

    try {
      const posts = await getAllPosts(user.id);

      setAllPosts(posts);
    } catch (e) {
      setPostsLoadingError(true);
    }

    setIsLoading(false);
  };

  const onSelectPost = async (post: Post | null) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    setIsLoading(true);

    getAllUsers()
      .then((result: User[]) => {
        setAllUsers(result);
      })
      .catch(() => {
        setPostsLoadingError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={allUsers}
                  selectedUser={selectedUser}
                  onSelectUser={onSelectUser}
                />

              </div>

              <div className="block" data-cy="MainContent">
                <p data-cy="NoSelectedUser">
                  {selectedUser ? selectedUser.name : 'No user selected'}
                </p>

                {isLoading && (
                  <Loader />
                )}

                {!isLoading && postsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isLoading && selectedUser && allPosts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!isLoading && selectedUser && allPosts.length > 0 && (
                  <PostsList
                    posts={allPosts}
                    onPostSelect={onSelectPost}
                    selectedPost={selectedPost}
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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                post={selectedPost}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
