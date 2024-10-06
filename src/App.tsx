import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
// import { NewCommentForm } from './components/NewCommentForm';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import * as userService from './api/user';
import * as postService from './api/post';
import * as comentService from './api/coments';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [postsForSelectedUser, setPostsForSelectedUser] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post>({
    id: 0,
    userId: 0,
    title: '',
    body: '',
  });

  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [coments, setComents] = useState<Comment[]>([]);

  const [slidbarIsActive, setSlidbarIsActive] = useState(false);

  const [errorLoadPosts, setErrorLoadPosts] = useState(false);
  const [errorLoadComents, setErrorLoadComents] = useState(false);

  const [loader, setLoader] = useState(false);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);
  const [isComentsLoaded, setIsComentsLoaded] = useState(false);

  const errorMessage = 'Something went wrong';

  //geting USERS
  useEffect(() => {
    userService
      .getUsers()
      .then(usersFromServer => {
        setUsers(usersFromServer);
      })
      .catch(er => {
        throw er;
      });
  }, []);

  //geting POSTS
  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setLoader(true);
    setIsPostsLoaded(false);
    setErrorLoadPosts(false);

    postService
      .getPosts(selectedUser?.id)
      .then(posts => {
        setPostsForSelectedUser(posts);
        setIsPostsLoaded(true);
      })
      .catch(er => {
        setErrorLoadPosts(true);
        setIsPostsLoaded(true);

        throw er;
      })
      .finally(() => {
        setLoader(false);
      });
  }, [selectedUser]);

  //geting COMENTS
  useEffect(() => {
    if (selectedPostId === 0) {
      return;
    }

    setIsComentsLoaded(true);
    setErrorLoadComents(false);
    comentService
      .getComments(selectedPostId)
      .then(cmnt => {
        setComents(cmnt);
      })
      .catch(er => {
        setErrorLoadComents(true);
        throw er;
      })
      .finally(() => {
        setIsComentsLoaded(false);
      });
  }, [selectedPostId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  stateSelectedUser={{ selectedUser, setSelectedUser }}
                  setSlidbarIsActive={setSlidbarIsActive}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : loader ? (
                  <Loader />
                ) : errorLoadPosts ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                ) : !isPostsLoaded ? (
                  <Loader />
                ) : postsForSelectedUser.length === 0 ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={postsForSelectedUser}
                    stateSelectedPost={{ selectedPost, setSelectedPost }}
                    setSlidbarIsActive={setSlidbarIsActive}
                    setSelectedPostId={setSelectedPostId}
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
              { 'Sidebar--open': slidbarIsActive },
            )}
          >
            {selectedPost && slidbarIsActive && (
              <>
                <div className="tile is-child box is-success">
                  <PostDetails
                    selectedPost={selectedPost}
                    coments={coments}
                    setComents={setComents}
                    isComentsLoaded={isComentsLoaded}
                    errorMessage={errorMessage}
                    errorLoadComents={errorLoadComents}
                    setErrorLoadComents={setErrorLoadComents}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
