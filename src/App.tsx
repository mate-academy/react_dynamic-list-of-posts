import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { ErrorMessage } from './types/ErrorMessage';
import { ShowLoader } from './types/ShowLoader';
import { client } from './utils/fetchClient';

const { LoadingComments, LoadingUser, LoadingPosts } = ErrorMessage;

export const App: React.FC = () => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post [] | undefined>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [isProcessing, setIsProcessing] = useState('');
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  useEffect(() => {
    if (activeUser) {
      setIsProcessing(ShowLoader.Post);
      client.get<Post[]>(`/posts?userId=${activeUser.id}`)
        .then(response => setPosts(response))
        .catch(() => setErrorMessage(LoadingPosts))
        .finally(() => setIsProcessing(''));
    }
  }, [activeUser]);

  useEffect(() => {
    setComments([]);
    if (activePost) {
      setIsProcessing(ShowLoader.SideBar);
      client.get<Comment[]>(`/comments?postId=${activePost.id}`)
        .then(response => setComments(response))
        .catch(() => setErrorMessage(LoadingComments))
        .finally(() => setIsProcessing(''));
    }
  }, [activePost, activeUser]);

  useEffect(() => {
    const timerId = setTimeout(() => setErrorMessage(null), 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  getActiveUser={setActiveUser}
                  activeUser={activeUser}
                  setErrorMessage={setErrorMessage}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!activeUser && errorMessage !== LoadingUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isProcessing === ShowLoader.Post && <Loader />}

                {((errorMessage === LoadingPosts
                  || errorMessage === LoadingUser) && errorMessage)
                && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {!posts?.length && posts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                { posts?.length !== 0 && posts
                && (
                  <PostsList
                    posts={posts}
                    activePost={activePost}
                    setActivePost={setActivePost}
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
              { 'Sidebar--open': activePost },
            )}
          >
            <div className="tile is-child box is-success ">
              {activePost && (
                <PostDetails
                  comments={comments}
                  isProcessing={isProcessing}
                  setComments={setComments}
                  activePost={activePost}
                  setIsProcessing={setIsProcessing}
                  setErrorMessage={setErrorMessage}
                  errorMessage={errorMessage}
                />
              ) }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
