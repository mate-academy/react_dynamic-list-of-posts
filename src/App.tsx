import React, { useContext, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { StateContext } from './PostsContext';
import { getPostsByUserId } from './api/posts';
import { Post } from './types/Post';

enum PostsStatus {
  Error = 'Error',
  Loading = 'Loading',
  ShowPosts = 'ShowPosts',
}

export const App: React.FC = () => {
  const { user, post } = useContext(StateContext);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [status, setStatus] = useState<PostsStatus>(PostsStatus.Loading);

  useEffect(() => {
    if (user) {
      setStatus(PostsStatus.Loading);
      getPostsByUserId(user.id)
        .then((items) => {
          setPosts(items);
          setStatus(PostsStatus.ShowPosts);
        })
        .catch(() => setStatus(PostsStatus.Error));
    }
  }, [user]);

  const renderPosts = () => {
    switch (status) {
      case PostsStatus.Loading:
        return <Loader />;

      case PostsStatus.ShowPosts:
        return posts?.length
          ? <PostsList posts={posts} />
          : (
            <div
              className="notification is-warning"
              data-cy="NoPostsYet"
            >
              No posts yet
            </div>
          );

      default:
        return (
          <div
            className="notification is-danger"
            data-cy="PostsLoadingError"
          >
            Something went wrong!
          </div>
        );
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {
                  !user
                    ? (
                      <p data-cy="NoSelectedUser">
                        No user selected
                      </p>
                    )
                    : renderPosts()
                }
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
                'Sidebar--open': post,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && <PostDetails post={post} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
