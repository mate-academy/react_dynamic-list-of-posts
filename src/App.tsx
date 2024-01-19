import React, { useEffect, useState } from 'react';
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
import { getPostUser, getUsers, getUsersComments } from './utils/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [commentError, setCommentError] = useState(false);
  const [isWritiing, setIsWriting] = useState(false);

  useEffect(() => {
    setMessageError(false);
    getUsers()
      .then(setUsers)
      .catch(() => setMessageError(true));

    const handleOutsideClick = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as HTMLElement).closest('.dropdown')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    if (selectedUser) {
      setLoading(true);
      setIsWriting(false);
      setPosts([]);
      getPostUser(selectedUser.id)
        .then(setPosts)
        .catch(() => setMessageError(true))
        .finally(() => setLoading(false));
    }

    if (selectedPost) {
      setLoading(true);
      getUsersComments(selectedPost.id)
        .then(setComments)
        .catch(() => setCommentError(true))
        .finally(() => setLoading(false));
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [selectedUser, selectedPost, isMenuOpen]);

  const handleButton = () => {
    setIsWriting(true);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setIsMenuOpen={setIsMenuOpen}
                  isMenuOpen={isMenuOpen}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  users={users}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!isMenuOpen && !selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {messageError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {!posts.length && selectedUser && !loading && !messageError && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!posts.length && (
                  <PostsList
                    posts={posts}
                    setSelectedPost={setSelectedPost}
                    selectedPost={selectedPost}
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
            {selectedPost && selectedUser && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  loading={loading}
                  commentError={commentError}
                  setLoading={setLoading}
                  setComments={setComments}
                  setCommentError={setCommentError}
                  isWritiing={isWritiing}
                  handleButton={handleButton}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
