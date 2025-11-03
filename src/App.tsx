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
import { Comment } from './types/Comment';
import { ErrorType } from './types/ErrorType';
import { Load } from './types/Load';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [comments, setComments] = useState<Comment[] | []>([]);
  const [loading, setLoading] = useState(Load.Nothing);
  const [error, setError] = useState(ErrorType.None);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(res => setPosts(res))
      .catch(() => setError(ErrorType.FetchPosts))
      .finally(() => setLoading(Load.Nothing));
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(res => setComments(res))
      .catch(() => setError(ErrorType.FetchComments))
      .finally(() => setLoading(Load.Nothing));
  }, [selectedPost]);

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
                  setSelectedPost={setSelectedPost}
                  setLoading={setLoading}
                  setError={setError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading === Load.Posts && <Loader />}

                {(error === ErrorType.FetchPosts ||
                  error === ErrorType.FetchUsers) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser &&
                  loading !== Load.Posts &&
                  error !== ErrorType.FetchPosts &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {posts.length > 0 && loading !== Load.Posts && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setLoading={setLoading}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  loading={loading}
                  error={error}
                  setComments={setComments}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
