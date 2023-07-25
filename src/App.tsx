import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import * as postService from './api/dataFromService';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [isErrorOccured, setIsErrorOccured] = useState<boolean>(false);
  const noPostsYet = selectedUser && !isDataLoading && !isErrorOccured;

  useEffect(() => {
    postService.getUsers()
      .then((userFromServer: User[]) => setUsers(userFromServer))
      .catch(() => setIsErrorOccured(true));
  }, []);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    setIsDataLoading(true);
    setIsErrorOccured(false);
    setSelectedPost(null);
    setPosts([]);

    if (!selectedUser) {
      return;
    }

    postService.getPosts(selectedUser.id)
      .then((postsFromServer: Post[]) => setPosts(postsFromServer))
      .catch(() => setIsErrorOccured(true))
      .finally(() => setIsDataLoading(false));
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onChange={user => setSelectedUser(user)}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {selectedUser && isDataLoading && <Loader />}

                {isErrorOccured && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                { noPostsYet && posts.length === 0 && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    onChange={post => setSelectedPost(post)}
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
              { 'Sidebar--open': selectedPost?.id },
            )}
          >
            {selectedPost?.id && (
              <div className="tile is-child box is-success ">
                <PostDetails post={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
