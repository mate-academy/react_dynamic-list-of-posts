import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import {
  addComment,
  deleteComment,
  getCommentsOfPost,
  getPosts,
  getUsers,
} from './api/users';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openedPostId, setOpenedPostId] = useState<number | null>(null);
  const [isPostsError, setIsPostsError] = useState<boolean>(false);
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(false);
  const [isAddCommentLoading, setIsAddCommentLoading] =
    useState<boolean>(false);
  const [isCommentsError, setIsCommentsError] = useState<boolean>(false);
  const [isCommentFormVisible, setIsCommentFormVisible] =
    useState<boolean>(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  function handleOpenPost(postId: number) {
    setIsCommentFormVisible(false);
    setOpenedPostId(prevId => (prevId === postId ? null : postId));
    setComments([]);
    setIsCommentsLoading(true);
  }

  function handleSelectUser(user: User | null) {
    setSelectedUser(user);
    setOpenedPostId(null);
    setComments([]);

    if (user) {
      setIsPostsLoading(true);
      setIsPostsError(false);
      getPosts(user.id)
        .then(setPosts)
        .catch(() => setIsPostsError(true))
        .finally(() => setIsPostsLoading(false));
    } else {
      setPosts([]);
    }
  }

  function handleDeleteComment(commentId: number) {
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );
    deleteComment(commentId);
  }

  async function handleAddComment(comment: CommentData, postId: number) {
    setIsCommentsError(false);
    setIsAddCommentLoading(true);

    try {
      const newComment = await addComment({ ...comment, postId });

      setComments(prevComments => [...prevComments, newComment]);
    } catch (error) {
      setIsCommentsError(true);
    } finally {
      setIsAddCommentLoading(false);
    }
  }

  useEffect(() => {
    setIsPostsError(false);

    if (openedPostId === null) {
      setComments([]);
      setIsCommentsLoading(false);

      return;
    }

    setIsCommentsLoading(true);
    getCommentsOfPost(openedPostId)
      .then(setComments)
      .catch(() => setIsCommentsError(true))
      .finally(() => setIsCommentsLoading(false));
  }, [openedPostId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  onSelectUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : isPostsLoading ? (
                  <Loader />
                ) : isPostsError ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                ) : posts.length === 0 ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={posts}
                    openedPostId={openedPostId}
                    onOpenPost={handleOpenPost}
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
              openedPostId === null ? 'Sidebar--closed' : 'Sidebar--open',
            )}
            style={{ display: openedPostId !== null ? 'block' : 'none' }}
          >
            {openedPostId !== null && (
              <div
                data-cy="Sidebar"
                className={classNames(
                  'tile',
                  'is-parent',
                  'is-8-desktop',
                  'Sidebar',
                  'Sidebar--open',
                )}
              >
                <div className="tile is-child box is-success ">
                  <PostDetails
                    post={posts.find(post => post.id === openedPostId) as Post}
                    comments={comments}
                    isCommentsLoading={isCommentsLoading}
                    isAddCommentLoading={isAddCommentLoading}
                    isCommentsError={isCommentsError}
                    setIsCommentsError={setIsCommentsError}
                    onDeleteComment={handleDeleteComment}
                    onAddComment={handleAddComment}
                    setIsCommentFormVisible={setIsCommentFormVisible}
                    isCommentFormVisible={isCommentFormVisible}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
