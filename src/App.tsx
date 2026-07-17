import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';

export const App = () => {
  const [error, setError] = useState('');
  const [chooseUserId, setChooseUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [loader, setLoader] = useState(false);

  const [postsFromUser, setPostsFromUser] = useState<Post[] | null>(null);
  const selectedPost = postsFromUser?.find(user => user.id === selectedPostId);

  useEffect(() => {
    if (chooseUserId) {
      setLoader(true);
      setSelectedPostId(null);

      client
        .get<Post[]>(`/posts?userId=${chooseUserId}`)
        .then(currentPosts => {
          setPostsFromUser(currentPosts);
        })
        .catch(() => {
          setError('Something went wrong!');
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [chooseUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  responce={value => setError(value)}
                  choosenUser={setChooseUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!loader && !error && !postsFromUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {loader ? (
                  <Loader />
                ) : (
                  postsFromUser && (
                    <PostsList
                      posts={postsFromUser}
                      selectedPost={setSelectedPostId}
                    />
                  )
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
                'Sidebar--open': selectedPost !== undefined,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
