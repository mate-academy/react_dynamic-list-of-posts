import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useState } from 'react';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const selectUser = (userId: number) => {
    setErrorMessage('');
    setIsLoading(true);
    setSelectedPost(null);

    client
      .get<Post[]>(`/posts?userId=${userId}`)
      .then(posts => {
        setSelectedPosts(posts);
      })
      .catch(error => {
        setErrorMessage('Failed to load posts. Please try again.');
        setSelectedPosts(null);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  onSelect={selectUser}
                  setIsSelected={setIsUserSelected}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!isUserSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {!isLoading && selectedPosts && selectedPosts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {!isLoading && selectedPosts && selectedPosts.length > 0 && (
                  <PostsList
                    selectedPosts={selectedPosts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                  />
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
              {selectedPost && (
                <PostDetails post={selectedPost} key={selectedPost.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
