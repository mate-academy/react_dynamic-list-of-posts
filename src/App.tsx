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
import { getUsers, getUserPosts } from './utils/api';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const canShowPosts = selectedUser && !postsLoading && !postsError;

  const handlePostSelected = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);
  };

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setSelectedPost(null);
    setPostsLoading(true);
    setPostsError(false);
    setPosts([]);

    getUserPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => {
        setPostsError(true);
      })
      .finally(() => {
        setPostsLoading(false);
      });
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
                  selectedUser={selectedUser}
                  onUserSelected={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && postsLoading && <Loader />}

                {selectedUser && !postsLoading && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {canShowPosts && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {canShowPosts && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onPostSelected={handlePostSelected}
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
              <PostDetails post={selectedPost} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
