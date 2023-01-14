import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadPosts = async (userID: number) => {
    setIsLoading(true);
    try {
      const postsFromServer = await getPosts(userID);

      setPosts(postsFromServer);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSelectedPost(null);

    if (selectedUser) {
      loadPosts(selectedUser.id);
    } else {
      setPosts([]);
    }
  }, [selectedUser?.id]);

  const postsSuccess = useMemo(
    () => selectedUser && !isLoading && !isError, [
      selectedUser, !isLoading, isError],
  );

  const noPosts = useMemo(
    () => postsSuccess && posts.length === 0, [postsSuccess, posts],
  );
  const thereArePosts = useMemo(
    () => postsSuccess && posts.length > 0, [postsSuccess, posts],
  );

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                { !selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                { selectedUser && isLoading && (<Loader />) }

                { selectedUser && !isLoading && isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) }

                {thereArePosts && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    setSelectedPost={setSelectedPost}
                  />
                ) }
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

              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
