import { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { client } from './utils/fetchClient';

import { User } from './types/User';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [addCommentError, setAddCommentError] = useState(false);

  useEffect(() => {
    client.get<User[]>('/users').then(setUsers);
  }, []);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);

    setSelectedPost(null);
    setShowCommentForm(false);

    setPosts([]);
    setPostsLoading(true);
    setPostsError(false);

    client
      .get<Post[]>(`/posts?userId=${user.id}`)
      .then(setPosts)
      .catch(() => setPostsError(true))
      .finally(() => setPostsLoading(false));
  };

  const handlePostSelect = (post: Post | null) => {
    if (!post) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);
    setShowCommentForm(false);

    setComments([]);
    setCommentsLoading(true);
    setCommentsError(false);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => setCommentsError(true))
      .finally(() => setCommentsLoading(false));
  };

  const handleAddComment = async (data: CommentData) => {
    if (!selectedPost) {
      return;
    }

    setAddCommentError(false);

    try {
      const newComment = await client.post<Comment>('/comments', {
        ...data,
        postId: selectedPost.id,
      });

      setComments(current => [...current, newComment]);
    } catch {
      setAddCommentError(true);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const previousComments = comments;

    setComments(current => current.filter(comment => comment.id !== commentId));

    try {
      await client.delete(`/comments/${commentId}`);
    } catch {
      setComments(previousComments);
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
                  selectedUser={selectedUser}
                  onSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && postsLoading && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser &&
                  !postsLoading &&
                  !postsError &&
                  (posts.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPost?.id ?? null}
                      onSelectPost={handlePostSelect}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open': Boolean(selectedPost),
            })}
          >
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  commentsLoading={commentsLoading}
                  commentsError={commentsError}
                  addCommentError={addCommentError}
                  showCommentForm={showCommentForm}
                  onShowForm={() => setShowCommentForm(true)}
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
