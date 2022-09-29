import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasErrorPosts, setHarErrorPosts] = useState(false);
  const [load, setLoad] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [openNewComment, setOpenNewComment] = useState(false);

  const loadPosts = async () => {
    if (selectedUserId) {
      setLoad(true);
      const getPosts = await client.get<Post[]>(`/posts?userId=${selectedUserId}`);

      try {
        setPosts(getPosts);
      } catch {
        setHarErrorPosts(true);
      } finally {
        setLoad(false);
      }
    }
  };

  useEffect(() => {
    loadPosts();
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setSelectedUserId={setSelectedUserId}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {load && <Loader />}

                {hasErrorPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts.length === 0 && selectedUserId !== 0 && !load && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && !load && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setOpenNewComment={setOpenNewComment}
                  />
                )}
              </div>
            </div>
          </div>

          {selectedPost && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  openNewComment={openNewComment}
                  setOpenNewComment={setOpenNewComment}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
