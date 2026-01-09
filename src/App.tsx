import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [isError, setIsError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [postsError, setPostsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(usersFromApi => setUserList(usersFromApi))
      .catch(() => setIsError(true));
  }, []);

  useEffect(() => {
    if (selectedUserId === null) {
      setPosts([]);
    } else {
      setPostsError(false);
      setIsPostLoading(true);
      setSelectedPost(null);
      client
        .get<Post[]>(`/posts?userId=${selectedUserId}`)
        .then(fetchedPosts => {
          setPosts(fetchedPosts);
        })
        .catch(() => {
          setPostsError(true);
        })
        .finally(() => {
          setIsPostLoading(false);
        });
    }
  }, [selectedUserId]);

  const noPostsFound =
    selectedUserId && !isPostLoading && !postsError && posts.length === 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {isError && (
                  <p className="notification is-danger">
                    Could not load users. Please refresh the page.
                  </p>
                )}

                <UserSelector
                  userList={userList}
                  setSelectedUserId={setSelectedUserId}
                  selectedUserId={selectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && !isError && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostLoading && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPostsFound && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!isPostLoading && selectedUserId && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id || null}
                    onSelect={setSelectedPost}
                    onClose={() => setSelectedPost(null)}
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
                'Sidebar--open': selectedPost !== null,
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
