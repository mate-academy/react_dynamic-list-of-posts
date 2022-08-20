import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Loader } from './components/Loader';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [hasError, setHasError] = useState(false);
  const isSidebar = selectedPost && true;

  const loadUsers = (url: string) : Promise<any> => {
    return client.get(url);
  };

  const loadPosts = async (id: number) : Promise<any> => {
    setIsLoading(true);
    const posts = await client.get(`/posts?userId=${id}`);

    setIsLoading(false);

    return posts;
  };

  useEffect(() => {
    loadUsers('/users')
      .then(response => {
        if ('error' in response) {
          setHasError(true);
        } else {
          setUsers(response);
        }
      });
  }, [users]);

  const handleChooseUser = (userId: number) => {
    loadPosts(userId)
      .then(posts => {
        if ('error' in posts) {
          setHasError(true);
        } else {
          setVisiblePosts(posts);
        }
      });
    setSelectedUserId(userId);
    setSelectedPost(null);
  };

  const handleChoosePost = (post: Post) => {
    if (selectedPost === post) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  onChoose={(userId) => {
                    handleChooseUser(userId);
                  }}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {(selectedUserId === 0)
                  ? (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )
                  : isLoading
                    ? (<Loader />)
                    : (visiblePosts.length === 0)
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
                          posts={visiblePosts}
                          onChoose={(post) => {
                            handleChoosePost(post);
                          }}
                          selectedPostId={selectedPost?.id}
                        />
                      )}

                {hasError && (
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
              { 'Sidebar--open': isSidebar },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
