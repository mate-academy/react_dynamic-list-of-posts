import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { Post } from './types/Post';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [isNoPostsYet, setIsNoPostsYet] = useState(false);
  const [showErrorPosts, setShowErrorPosts] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {})
      .finally(() => {});
  }, []);

  const onSelectedUser = (user: User | null) => {
    setSelectedUser(user);
  };

  const onSelectedPost = (post: Post | null) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    if (selectedUser) {
      setLoading(true);
      setIsNoPostsYet(false);
      setShowErrorPosts(false);
      setSelectedPost(null);

      setPosts([]);

      getPosts(selectedUser.id)
        .then(fetchedPosts => {
          setPosts(fetchedPosts);

          if (!fetchedPosts.length) {
            setIsNoPostsYet(true);
          }
        })
        .catch(() => setShowErrorPosts(true))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} onSelected={onSelectedUser} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {showErrorPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {selectedUser && !!posts.length && (
                  <PostsList posts={posts} onSelected={onSelectedPost} />
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
