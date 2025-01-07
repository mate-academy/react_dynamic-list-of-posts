/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useMemo, useState } from 'react';
import * as servicesUsers from './api/users';
import * as servicesPosts from './api/posts';
import * as servicesComments from './api/comments';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentPostId, setCurrentPostId] = useState(0);
  const [openPostId, setOpenPostId] = useState<number | null>(null);
  const [isWritePostButton, setIsWritePostButton] = useState(false);
  const [loading, setLoading] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setLoading('users');
    servicesUsers
      .getUsers()
      .then(res => {
        setUsers(res);
        setIsError(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setLoading(''));
  }, []);

  useEffect(() => {
    if (userId) {
    setLoading('posts');
    servicesPosts.getPosts(userId)
      .then(res => {
        setPosts(res);
        setIsError(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setLoading(''));
    }
}, [userId]);

  const getCommentsByPostId = (postId: number) => {
    setLoading('comments');
    setCurrentPostId(postId);

    return servicesComments
      .getComments(postId)
      .then(res => {
        setComments(res);
        setIsError(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setLoading(''));
  };

  const addComment = ({ name, email, body, postId }: Comment) => {
    setLoading('addComment');

    return servicesComments
      .createComment({ name, email, body, postId })
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
        setIsError(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setLoading(''));
  };

  const deleteComment = (commentId: number) => {
    servicesComments
      .deleteComment(commentId)
      .then(() =>
        setComments(currentComments =>
          currentComments.filter(comment => comment.id !== commentId),
        ),
      );
  };

  const currentPost = useMemo(() => {
    return posts.find((post: Post) => post.id === currentPostId);
  }, [currentPostId, posts]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  setIsUser={setIsUser}
                  setOpenPostId={setOpenPostId}
                  setUserId={setUserId}
                />
              </div>
              {loading === 'users' && <Loader />}
              <div className="block" data-cy="MainContent">
                <p data-cy="NoSelectedUser">
                  {!isUser && loading !== 'users' && 'No user selected'}
                </p>

                {loading === 'posts' && <Loader />}
                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts.length === 0 &&
                  isUser &&
                  loading !== 'posts' &&
                  !isError && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                      No posts yet
                    </div>
                )}

                {isUser &&
                  posts.length > 0 &&
                  loading !== 'posts' &&
                  !isError && (
                  <PostsList
                    posts={posts}
                    getCommentsByPostId={getCommentsByPostId}
                    openPostId={openPostId}
                    setOpenPostId={setOpenPostId}
                    setIsWritePostButton={setIsWritePostButton}
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
                {'Sidebar--open': posts.length > 0 && openPostId}
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails
                  comments={comments}
                  currentPost={currentPost}
                  addComment={addComment}
                  isWritePostButton={isWritePostButton}
                  setIsWritePostButton={setIsWritePostButton}
                  deleteComment={deleteComment}
                  loadingComments={loading === 'comments'}
                  loadingAddNewComment={loading === 'addComment'}
                  isError={isError}
                />
              </div>
            </div>
        </div>
      </div>
    </main>
  );
};
