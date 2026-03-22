import classNames from 'classnames';
import { useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import {
  addComment,
  deleteComment,
  getCommentsByPost,
  getPostsByUser,
  getUsers,
} from './api';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Comment } from './types/Comment';
import { Post } from './types/Post';
import { User } from './types/User';
import { useEffect } from 'react';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postsLoadingError, setPostsLoadingError] = useState(false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentsLoadingError, setCommentsLoadingError] = useState(false);

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [commentActionError, setCommentActionError] = useState('');

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const resetPostState = () => {
    setSelectedPost(null);
    setComments([]);
    setIsCommentsLoading(false);
    setCommentsLoadingError(false);
    setIsCommentFormVisible(false);
    setCommentActionError('');
  };

  const handleUserSelect = async (user: User) => {
    setSelectedUser(user);
    setIsSelectorOpen(false);

    setPosts([]);
    setIsPostsLoading(true);
    setPostsLoadingError(false);

    resetPostState();

    try {
      const loadedPosts = await getPostsByUser(user.id);

      setPosts(loadedPosts);
    } catch {
      setPostsLoadingError(true);
    } finally {
      setIsPostsLoading(false);
    }
  };

  const handlePostOpen = async (post: Post) => {
    setSelectedPost(post);
    setComments([]);
    setIsCommentsLoading(true);
    setCommentsLoadingError(false);
    setIsCommentFormVisible(false);
    setCommentActionError('');

    try {
      const loadedComments = await getCommentsByPost(post.id);

      setComments(loadedComments);
    } catch {
      setCommentsLoadingError(true);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  const handlePostClose = () => {
    resetPostState();
  };

  const handleAddComment = async (data: {
    name: string;
    email: string;
    body: string;
  }) => {
    if (!selectedPost) {
      return;
    }

    setCommentActionError('');

    try {
      const newComment = await addComment({
        postId: selectedPost.id,
        ...data,
      });

      setComments(currentComments => [...currentComments, newComment]);
    } catch {
      setCommentActionError('Unable to add a comment');
    }
  };

  const handleDeleteComment = (commentId: number) => {
    const previousComments = comments;

    setCommentActionError('');
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    deleteComment(commentId).catch(() => {
      setComments(previousComments);
      setCommentActionError('Unable to delete a comment');
    });
  };

  const showNoSelectedUser = !selectedUser;
  const showPostsLoader = !!selectedUser && isPostsLoading;
  const showPostsError = !!selectedUser && !isPostsLoading && postsLoadingError;
  const showNoPosts =
    !!selectedUser &&
    !isPostsLoading &&
    !postsLoadingError &&
    posts.length === 0;
  const showPostsList =
    !!selectedUser && !isPostsLoading && !postsLoadingError && posts.length > 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div
                className="block"
                onBlur={() => setIsSelectorOpen(false)}
                tabIndex={0}
              >
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  isOpen={isSelectorOpen}
                  onToggle={() => setIsSelectorOpen(current => !current)}
                  onSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {showNoSelectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {showPostsLoader && <Loader />}

                {showPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPostsList && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id ?? null}
                    onOpen={handlePostOpen}
                    onClose={handlePostClose}
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
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  isLoadingComments={isCommentsLoading}
                  commentsLoadingError={commentsLoadingError}
                  isCommentFormVisible={isCommentFormVisible}
                  commentActionError={commentActionError}
                  onShowForm={() => setIsCommentFormVisible(true)}
                  onAddComment={handleAddComment}
                  onDeleteComment={handleDeleteComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
