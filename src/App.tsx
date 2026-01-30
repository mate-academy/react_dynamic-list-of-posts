import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import * as userServices from '../src/utils/user';
import * as postServices from '../src/utils/post';
import * as commentsServices from './utils/comment';
import { Post } from './types/Post';
import { Errors } from './utils/errors';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [postErrorMessage, setPostErrorMessage] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isPostsLoad, setIsPostsLoad] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoad, setIsCommentsLoad] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  console.log(users);

  function getUsers() {
    userServices.getUsers().then(response => setUsers(response));
  }

  function getPosts(userId: number) {
    setIsPostOpen(false);
    setPosts(null);
    setIsPostsLoad(true);
    postServices
      .getPosts(userId)
      .then(response => {
        setPosts(response);
      })
      .catch(() => setPostErrorMessage(Errors.Loading))
      .finally(() => {
        setIsPostsLoad(false);
        setIsFormOpen(false);
      });
  }

  function getComments(id: number) {
    setIsCommentsLoad(true);
    commentsServices
      .getComments(id)
      .then(response => {
        setComments(response);
      })
      .catch(() => setCommentsError(Errors.Loading))
      .finally(() => setIsCommentsLoad(false));
  }

  function deleteComments(id: number, lastComments: Comment[]) {
    const newComments = lastComments.filter(comment => comment.id !== id);

    setComments(newComments);
    commentsServices.deleteComments(id);
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (user) {
      getPosts(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (!isPostOpen || !selectedPost) {
      return;
    } else {
      getComments(selectedPost.id);
    }
  }, [isPostOpen, selectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  onChoice={setUser}
                  users={users}
                  onChangeUser={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!user && <p data-cy="NoSelectedUser">No user selected</p>}
                {isPostsLoad && <Loader />}

                {postErrorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postErrorMessage}
                  </div>
                )}

                {posts && posts.length === 0 && user && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {posts && user && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    onChange={setIsPostOpen}
                    onSelect={setSelectedPost}
                    selectedPost={selectedPost}
                    onFormChange={setIsFormOpen}
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
              { 'Sidebar--open': isPostOpen },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  comments={comments}
                  errorMessage={commentsError}
                  isCommentsLoad={isCommentsLoad}
                  selectedPost={selectedPost}
                  onNewComment={setComments}
                  onError={setCommentsError}
                  onDelete={deleteComments}
                  onFormOpen={setIsFormOpen}
                  isFormOpen={isFormOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
