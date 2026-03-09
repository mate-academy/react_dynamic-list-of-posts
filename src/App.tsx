/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { getUsers } from './api/users';
import { getUsersPosts, getPostsDetails } from './api/postsApi';
import { getComments,  deleteComment  } from './api/commentsApi';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comments } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [errorUsers, setErrorUsers] = useState<string>('');

  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [errorPosts, setErrorPosts] = useState<string>('');

  const [currentUser, setCurrentUser] = useState<number>(0);
  const [currentPost, setCurrentPost] = useState<number>(0);

  const [post, setPost] = useState<Post | null>(null);
  const [loadingPostInfo, setLoadingPostInfo] = useState<boolean>(false);
  const [errorPostInfo, setErrorPostInfo] = useState<string>('');

  const [comments, setComments] = useState<Comments[]>([]);
  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  const [errorComments, setErrorComments] = useState<string>('');

  const [isOpenSide, setIsOpenSide] = useState<boolean>(false);
  const [commentBtn, setCommentsBtn] = useState<boolean>(true);

  useEffect(() => {
    setLoadingUsers(true);
    getUsers()
      .then(setUsers)
      .catch(() => setErrorUsers('Problem loading users'))
      .finally(() => setLoadingUsers(false));
  }, []);

  useEffect(() => {
    if (currentUser === 0) {
      return;
    }

    setLoadingPosts(true);
    setErrorPosts('');
    setPosts([]);
    getUsersPosts(currentUser)
      .then(setPosts)
      .catch(() => setErrorPosts('Problem loading posts'))
      .finally(() => setLoadingPosts(false));
  }, [currentUser]);

  useEffect(() => {
    if (currentPost === 0) {
      return;
    }

    setLoadingPostInfo(true);
    setLoadingComments(true);
    setErrorPostInfo('');
    setErrorComments('');

    getPostsDetails(currentPost)
      .then(setPost)
      .catch(() => setErrorPostInfo('Something went wrong'))
      .finally(() => setLoadingPostInfo(false));

    getComments(currentPost)
      .then(setComments)
      .catch(() => setErrorComments('Something went wrong'))
      .finally(() => setLoadingComments(false));
  }, [currentPost]);

  const handleAddComment = (newComment: Comments) => {
    setComments(prev => [...prev, newComment]);
  };

  const handleDeleteComment = async (id: number) => {
    setComments(prev => prev.filter(comment => comment.id !== id));

    try {
      await deleteComment(id);
    } catch {
      setErrorComments('Failed to delete comment');
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {loadingUsers && currentUser !== 0 ? (
                  <Loader />
                ) : (
                  <>
                    <UserSelector
                      usersFromServer={users}
                      activeUser={currentUser}
                      onUser={setCurrentUser}
                    />
                  </>
                )}
                {errorUsers && (
                  <div className="notification is-danger">{errorUsers}</div>
                )}
              </div>
              {currentUser === 0 && (
                <p data-cy="NoSelectedUser">No user selected</p>
              )}
              <div className="block" data-cy="MainContent">
                {loadingPosts && <Loader />}

                {!loadingPosts && errorPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorPosts}
                  </div>
                )}
                {/* eslint-disable-next-line @typescript-eslint/indent */}
                {!loadingPosts &&
                  !errorPosts &&
                  currentUser !== 0 &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}
                {/* eslint-disable-next-line @typescript-eslint/indent */}

                {!loadingPosts && !errorPosts && posts.length > 0 && (
                  <PostsList
                    data={posts}
                    onCurrentPost={setCurrentPost}
                    activePost={currentPost}
                    isOpen={isOpenSide}
                    onOpen={setIsOpenSide}
                    onVisibleWriteBtn={setCommentsBtn}
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
              { 'Sidebar--open': isOpenSide },
            )}
          >
            <div className="tile is-child box is-success">
              <PostDetails
                data={post}
                loadingState={loadingPostInfo || loadingComments}
                error={errorPostInfo || errorComments}
                onError={setErrorComments}
                comments={comments}
                postId={currentPost}
                isVisible={commentBtn}
                setIsVisible={setCommentsBtn}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
