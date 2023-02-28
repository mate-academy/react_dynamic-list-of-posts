import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isError, setIsError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [postsLoaded, setPostsLoaded] = useState(false);

  const selectedPost = posts.find(post => post.id === selectedPostId) || null;

  const getUserPostsFromServer = async () => {
    setPosts([]);
    try {
      setIsPostLoading(true);
      setPostsLoaded(false);

      const postsFromServer = await getUserPosts(selectedUserId);

      setPosts(postsFromServer);
      setIsPostLoading(false);
      setPostsLoaded(true);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (selectedUserId !== 0) {
      getUserPostsFromServer();
    }
  }, [selectedUserId]);

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
    setSelectedPostId(0);
  };

  const handleSelectedPostId = (postId: number) => {
    setSelectedPostId(postId);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUserId={selectedUserId}
                  handleSelectUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {(isPostLoading && !isError) && <Loader /> }

                {postsLoaded && (
                  <>
                    {!posts.length
                      ? (
                        <div
                          className="notification is-warning"
                          data-cy="NoPostsYet"
                        >
                          No posts yet
                        </div>
                      )
                      : (
                        <PostsList
                          posts={posts}
                          selectedPostId={selectedPostId}
                          handleSelectedPostId={handleSelectedPostId}
                        />
                      )}
                  </>
                )}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
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
              { 'Sidebar--open': !!selectedPostId },
            )}
          >

            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} /> }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
