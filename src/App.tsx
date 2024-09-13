import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import * as userService from './api/users';
import * as postService from './api/posts';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasWarning, setHasWarning] = useState(false);

  useEffect(() => {
    setHasError(false);

    userService
      .getUsers()
      .then(setUsers)
      .catch(() => setHasError(true));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoadingPosts(true);
      setHasError(false);
      setHasWarning(false);
      setUserPosts([]);
      setSelectedPost(null);

      postService
        .getPosts(selectedUser.id)
        .then(posts => {
          if (posts.length > 0) {
            setUserPosts(posts);
          } else {
            setHasWarning(true);
          }
        })
        .catch(() => setHasError(true))
        .finally(() => setIsLoadingPosts(false));
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor columns">
          <div className="tile is-parent column">
            <div className="tile is-child box is-success">
              <div className="block">
                {users && (
                  <UserSelector
                    users={users}
                    selectedUser={selectedUser}
                    onSelectUser={setSelectedUser}
                  />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!hasError && hasWarning && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!hasError && userPosts.length > 0 && (
                  <PostsList
                    posts={userPosts}
                    selectedPost={selectedPost}
                    onSelect={setSelectedPost}
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
              'column',
              'Sidebar',
              {
                'Sidebar--open': selectedPost !== null,
              },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
