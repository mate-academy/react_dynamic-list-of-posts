import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingPostsError, setLoadingPostsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers()
      .then(allUsers => {
        setUsers(allUsers as User[]);
      })
      .catch(() => setLoadingPostsError(true))
      .finally(() => setLoadingPosts(false));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoadingPosts(true);

      getPosts(selectedUser.id.toString())
        .then(allPosts => {
          setPosts(allPosts);
        })
        .catch(() => setLoadingPostsError(true))
        .finally(() => setLoadingPosts(false));
    }
  }, [selectedUser]);

  let postsContent;

  if (loadingPosts) {
    postsContent = <Loader />;
  } else if (loadingPostsError) {
    postsContent = (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Something went wrong!
      </div>
    );
  } else if (selectedUser && posts && posts?.length > 0) {
    postsContent = (
      <PostsList
        userPosts={posts}
        currentPost={selectedPost}
        onPostSelected={setSelectedPost}
      />
    );
  } else if (selectedUser && posts && posts.length === 0) {
    postsContent = (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onUserSelect={setSelectedUser}
                  userSelected={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                ) : (postsContent)}

              </div>
            </div>
          </div>

          {selectedPost && (
            <div
              data-cy="Sidebar"
              className={cn(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails post={selectedPost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
