import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers } from './components/api/users';
import { Post } from './types/Post';
import { getPostsOfUser } from './components/api/posts';
import {
  deleteCommentFromPost, getCommentsOfPost,
} from './components/api/comments';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [user, setUser] = useState('Choose a user');
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isOpenPosts, setIsOpenPosts] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeUserId, setActiveUserId] = useState(0);
  const [isNotPosts, setIsNotPosts] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPostId, setCurrentPostId] = useState(0);
  const [showSpinnerComments, setShowSpinnerComments] = useState(false);
  const [isNotComments, setIsNotComments] = useState(false);
  const [isErrorComments, setIsErrorComments] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  const handleClickLoadPosts = (userId: number) => {
    setPosts([]);
    setCurrentPostId(0);
    setIsError(false);
    setShowSpinner(true);
    setIsNotPosts(false);
    getPostsOfUser(userId)
      .then(postsOfUsers => {
        if (!postsOfUsers.length) {
          setIsNotPosts(true);
        }

        if (postsOfUsers.length) {
          setIsNotPosts(false);
        }

        setPosts(postsOfUsers);
      })
      .catch(() => setIsError(true))
      .finally(() => setShowSpinner(false));
    setOpenDropdown(false);
    setActiveUserId(userId);
  };

  const handleClickLoadComments = (postId: number) => {
    if (isOpenPosts) {
      setIsOpenPosts(false);
      setCurrentPostId(0);

      return;
    }

    setIsOpenPosts(true);
    setOpenForm(false);
    setIsNotComments(false);
    setIsErrorComments(false);
    setComments([]);
    setShowSpinnerComments(true);
    setCurrentPostId(postId);
    getCommentsOfPost(postId)
      .then(commentsPost => {
        if (!commentsPost.length) {
          setIsNotComments(true);
        }

        if (commentsPost.length) {
          setIsNotComments(false);
        }

        setComments(commentsPost);
      })
      .catch(() => setIsErrorComments(true))
      .finally(() => setShowSpinnerComments(false));
  };

  const currentPost = useMemo(() => {
    const neededPost = posts.find(post => post.id === currentPostId);

    if (neededPost) {
      return neededPost;
    }

    return {
      id: 0, userId: 0, title: '', body: '',
    };
  }, [currentPostId]);

  const hendleDeleteComment = (commentId: number) => {
    const copyComments = [...comments];
    const deletedComment = copyComments
      .find(comment => comment.id === commentId);

    if (deletedComment) {
      const index = copyComments.indexOf(deletedComment);

      copyComments.splice(index, 1);
      setComments(copyComments);
    }

    deleteCommentFromPost(commentId)
      .catch(() => setComments(comments));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  user={user}
                  setUser={setUser}
                  users={users}
                  loadPosts={handleClickLoadPosts}
                  dropdown={openDropdown}
                  setDropdown={setOpenDropdown}
                  activeUserId={activeUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!activeUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {showSpinner && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNotPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!posts.length && (
                  <PostsList
                    postsOfUser={posts}
                    loadComments={handleClickLoadComments}
                    currentPostId={currentPostId}
                    isOpenPosts={isOpenPosts}
                  />
                )}
              </div>
            </div>
          </div>

          {isOpenPosts && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                { 'Sidebar--open': isOpenPosts },
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails
                  comments={comments}
                  currentPost={currentPost}
                  showSpinner={showSpinnerComments}
                  isNotComments={isNotComments}
                  isErrorComments={isErrorComments}
                  openForm={openForm}
                  setOpenForm={setOpenForm}
                  currentPostId={currentPostId}
                  setComments={setComments}
                  setIsErrorComments={setIsErrorComments}
                  hendleDeleteComment={hendleDeleteComment}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
