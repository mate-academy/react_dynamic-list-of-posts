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
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [activeBtnId, setActiveBtnId] = useState<number | null>(null);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [commentBtn, setCommentBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentActionError, setCommentActionError] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [postsError, setPostsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    client
      .get('/users')
      .then(data => setUsers(data as User[]))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!activeUser) {
      setUserPosts([]);

      return;
    }

    setUserPosts([]);
    setIsPostsLoading(true);
    setPostsError(false);

    client
      .get(`/posts?userId=${activeUser.id}`)
      .then(data => setUserPosts(data as Post[]))
      .catch(() => setPostsError(true))
      .finally(() => setIsPostsLoading(false));
  }, [activeUser]);

  useEffect(() => {
    if (!activePost) {
      setUserComments([]);

      return;
    }

    setUserComments([]);
    setIsCommentsLoading(true);
    setCommentsError(false);

    client
      .get(`/comments?postId=${activePost.id}`)
      .then(data => setUserComments(data as Comment[]))
      .catch(() => setCommentsError(true))
      .finally(() => setIsCommentsLoading(false));
  }, [activePost]);

  useEffect(() => {
    setFormIsOpen(false);
    setCommentBtn(true);
  }, [activeUser, activePost]);

  const handleCommentDelete = async (commentId: number) => {
    setCommentActionError(false);
    const prevComments = [...userComments];

    setUserComments(prev => prev.filter(comment => comment.id !== commentId));

    try {
      await client.delete(`/comments/${commentId}`);
    } catch {
      setUserComments(prevComments);
      setCommentActionError(true);
    }
  };

  const handleAddComment = async (comment: Omit<Comment, 'id'>) => {
    setCommentActionError(false);
    const prevComments = [...userComments];
    const tempComment = {
      ...comment,
      id: Date.now(),
    };

    setUserComments(prev => [...prev, tempComment]);

    try {
      await client.post(`/comments`, comment);
    } catch {
      setUserComments(prevComments);
      setCommentActionError(true);
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                  setActivePost={setActivePost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!activeUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostsLoading && <Loader />}

                {postsError && !isPostsLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!postsError && userPosts.length === 0 && !isPostsLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {activeUser &&
                  !postsError &&
                  !isLoading &&
                  userPosts.length > 0 && (
                    <PostsList
                      posts={userPosts}
                      activeBtnId={activeBtnId}
                      setActiveBtnId={setActiveBtnId}
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
              {
                'Sidebar--open':
                  activeBtnId === activePost?.id && userPosts.length > 0,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {activePost && (
                <PostDetails
                  post={activePost}
                  comments={userComments}
                  handleCommentDelete={handleCommentDelete}
                  handleAddComment={handleAddComment}
                  commentsError={commentsError}
                  commentActionError={commentActionError}
                  isCommentsLoading={isCommentsLoading}
                  formIsOpen={formIsOpen}
                  setFormIsOpen={setFormIsOpen}
                  commentBtn={commentBtn}
                  setCommentBtn={setCommentBtn}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
