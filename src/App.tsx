import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import classNames from 'classnames';
import './App.scss';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUserPosts } from './services/post';
import { PostDetails } from './components/PostDetails';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<null | User>(null);
  const [selectedPost, setSelectedPost] = useState<null | Post>(null);
  const [loading, setLoading] = useState(false);
  const [hasPostError, setHasPostError] = useState(false);

  const [posts, setPosts] = useState<[] | Post[]>([]);

  const noPosts = selectedUser && !posts.length && !loading;
  const hasPost = selectedUser && !hasPostError && posts.length && !loading;
  const isVisibleSidebar = selectedUser?.id === selectedPost?.userId
    && !!selectedPost;

  function loadPosts() {
    if (selectedUser) {
      setLoading(true);
      setHasPostError(false);

      getUserPosts(selectedUser.id)
        .then(setPosts)
        .catch((error) => {
          setHasPostError(true);
          throw error;
        })
        .finally(() => setLoading(false));
    }
  }

  useEffect(loadPosts, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  onSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loading && <Loader />}

                {hasPostError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!!noPosts && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {(!!hasPost) && (
                  <PostsList
                    posts={posts}
                    onSelectedPost={setSelectedPost}
                    selectedPost={selectedPost}
                  />
                )}

              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames('tile is-parent is-8-desktop Sidebar',
              { 'Sidebar--open': isVisibleSidebar })}
          >
            <div className="tile is-child box is-success ">

              {isVisibleSidebar && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
