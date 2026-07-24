import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { useEffect, useState } from 'react';
import { getUsers } from './api/users';
import { Post } from './types/Post';
import { getPosts } from './api/postsApi';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isPostsError, setIsPostsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);

      return;
    }

    setIsLoadingPosts(true);
    setIsPostsError(false);
    setSelectedPost(null);

    getPosts(selectedUser.id)
      // .then(module => module.getPosts(selectedUser.id))
      .then(setPosts)
      .catch(() => setIsPostsError(true))
      .finally(() => setIsLoadingPosts(false));
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  onSelect={setSelectedUser}
                  selectedUser={selectedUser}
                  users={users}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && isLoadingPosts && <Loader />}

                {selectedUser && !isLoadingPosts && isPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser &&
                  !isLoadingPosts &&
                  !isPostsError &&
                  posts.length === 0 && (
                    <div
                      data-cy="NoPostsYet"
                      className="notification is-warning"
                    >
                      No posts yet
                    </div>
                  )}

                {selectedUser &&
                  !isLoadingPosts &&
                  !isPostsError &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
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
              { 'Sidebar--open': selectedPost !== null },
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
