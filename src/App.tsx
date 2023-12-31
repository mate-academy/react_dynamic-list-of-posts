import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { getPosts } from './api/api';

export const App: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [postsListError, setPostsListError] = useState<boolean>(false);
  const [postId, setPostId] = useState<number | null>(null);

  useEffect(() => {
    const getPostData = async () => {
      if (userId) {
        try {
          const postData = await getPosts(userId);

          setPostsListError(false);
          setPosts(postData);
        } catch (error) {
          setPostsListError(true);
          setPosts([]);
        }
      }
    };

    getPostData();
  }, [userId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  userId={userId}
                  setUserId={setUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {!postsListError && !posts && userId && (<Loader />)}

                {postsListError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {userId && posts && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userId && posts && posts.length > 0
                  && (
                    <PostsList
                      posts={posts}
                      postId={postId}
                      setPostId={setPostId}
                    />
                  )}
              </div>
            </div>
          </div>

          {postId && (
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
                <PostDetails />
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
};

/*
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
              <PostDetails />
            </div>
          </div>
*/
