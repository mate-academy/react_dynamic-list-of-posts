/* eslint-disable @typescript-eslint/indent */
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [postsError, setPostsError] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    setIsLoadingUsers(true);
    client
      .get<User[]>('/users')
      .then(setUsers)
      .finally(() => setIsLoadingUsers(false));
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      setPosts([]);
      setSelectedPostId(null);

      return;
    }

    setIsLoadingPosts(true);
    setPostsError(false);
    setPosts([]);
    setSelectedPostId(null);

    client
      .get<Post[]>(`/posts?userId=${selectedUserId}`)
      .then(setPosts)
      .catch(() => setPostsError(true))
      .finally(() => setIsLoadingPosts(false));
  }, [selectedUserId]);

  useEffect(() => {
    if (!selectedPostId) {
      setComments([]);
      setShowCommentForm(false);

      return;
    }

    setIsLoadingComments(true);
    setCommentsError(false);
    setShowCommentForm(false);

    client
      .get<Comment[]>(`/comments?postId=${selectedPostId}`)
      .then(setComments)
      .catch(() => setCommentsError(true))
      .finally(() => setIsLoadingComments(false));
  }, [selectedPostId]);

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
    setSelectedPostId(null);
    setShowCommentForm(false);
  };

  const handleAddComment = async (
    commentData: Omit<Comment, 'id' | 'postId'>,
  ) => {
    if (!selectedPostId) {
      return;
    }

    setIsSubmittingComment(true);
    const newComment = {
      ...commentData,
      postId: selectedPostId,
    };

    // setComments(current => [...current, newComment]);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const commentFromServer = await client.post<Comment>(
        '/comments',
        newComment,
      );

      setComments(current => [...current, commentFromServer]);
    } catch {
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(current => current.filter(c => c.id !== commentId));
    client.delete(`/comments/${commentId}`).catch(() => {
      client
        .get<Comment[]>(`/comments?postId=${selectedPostId}`)
        .then(setComments);
    });
  };

  const selectedPost = posts.find(post => post.id === selectedPostId);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  onSelect={handleUserSelect}
                  isLoading={isLoadingUsers}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoadingPosts && <Loader />}
                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {selectedUserId &&
                  !isLoadingPosts &&
                  !posts.length &&
                  !postsError && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}
                {selectedUserId && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    onSelect={setSelectedPostId}
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
              { 'Sidebar--open': selectedPostId !== null },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  isLoadingComments={isLoadingComments}
                  commentsError={commentsError}
                  showCommentForm={showCommentForm}
                  onToggleCommentForm={() =>
                    setShowCommentForm(!showCommentForm)
                  }
                  onAddComment={handleAddComment}
                  onDeleteComment={handleDeleteComment}
                  isSubmittingComment={isSubmittingComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
