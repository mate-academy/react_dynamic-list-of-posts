import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useMemo, useState } from 'react';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [activeBtnId, setActiveBtnId] = useState<number | null>(null);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [commentBtn, setCommentBtn] = useState(true);
  const [error, setError] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true);
    client
      .get('/users')
      .then(data => setUsers(data as User[]))
      .finally(() => setIsLoad(false));
  }, []);

  useEffect(() => {
    if (!activeUser) {
      setPosts([]);

      return;
    }

    setIsLoad(true);
    setError(false);

    client
      .get(`/posts?userId=${activeUser.id}`)
      .then(data => setPosts(data as Post[]))
      .catch(() => setError(true))
      .finally(() => setIsLoad(false));
  }, [activeUser]);

  useEffect(() => {
    if (!activePost) {
      setComments([]);

      return;
    }

    setIsLoad(true);
    setError(false);

    client
      .get(`/comments?postId=${activePost.id}`)
      .then(data => setComments(data as Comment[]))
      .catch(() => setError(true))
      .finally(() => setIsLoad(false));
  }, [activePost]);

  useEffect(() => {
    setFormIsOpen(false);
    setCommentBtn(true);
  }, [activeUser, activePost]);

  const handleCommentDelete = (commentId: number) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const handleAddComment = (comment: Comment) => {
    setComments(prev => [...prev, comment]);
  };

  const userPosts = useMemo(() => {
    return [...posts].filter(post => post.userId === activeUser?.id);
  }, [activeUser, posts]);

  const userComments = useMemo(() => {
    return [...comments].filter(comment => comment.postId === activePost?.id);
  }, [activePost, comments]);

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

                {isLoad && !error && <Loader />}

                {error && !isLoad && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!error && userPosts.length === 0 && !isLoad && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {activeUser && !error && !isLoad && userPosts.length > 0 && (
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
          {/* activeBtnId === activePost?.id && userPosts.length > 0 */}
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
                  error={error}
                  loading={isLoad}
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
