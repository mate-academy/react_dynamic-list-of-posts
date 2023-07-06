import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import {
  getPosts, getUsers,
} from './api/api';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postError, setPostError] = useState(false);

  useEffect(() => {
    getUsers('/users')
      .then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const serchedUrl = `/posts?userId=${selectedUser.id}`;

      setPostsLoading(true);
      getPosts(serchedUrl)
        .then((userPosts: Post[]) => {
          setPosts(userPosts);
          setPostError(false);
        })
        .catch(() => setPostError(true))
        .finally(() => setPostsLoading(false));
    }
  }, [selectedUser]);

  const handleUserSelected = (user: User) => {
    setSelectedUser(user);
  };

  const handlePostSelected = (post: Post) => {
    setSelectedPost(post);
  };

  const selectPost = posts.find(post => post === selectedPost) || null;

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
                  userSelectedId={handleUserSelected}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {postsLoading ? (
                  <Loader />
                ) : (
                  <>
                    {postError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {posts.length > 0 && (
                      <PostsList
                        posts={posts}
                        postSelected={handlePostSelected}
                      />
                    )}

                    {!posts.length && selectedUser && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}
                  </>
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
              { 'Sidebar--open': posts.length && selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectPost && (
                <PostDetails
                  selectedPost={selectPost}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
