import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';

import { User } from './types/User';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { getComments, deleteComment, createComment } from './api/comments';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postId, setPostId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  const [dropError, setDropError] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [dropErrorComments, setDropErrorComments] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchPosts = useCallback(async (selectedId: number) => {
    setShowPosts(false);
    setLoading(true);
    setDropError(false);
    try {
      const postsFromServer = await getPosts(selectedId);

      setPosts(postsFromServer);
      setLoading(false);
      setShowPosts(true);
    } catch (error) {
      setLoading(false);
      setDropError(true);
    }
  }, []);

  const fetchComments = useCallback(async (selectedPostId: number) => {
    setShowComments(false);
    setLoadingComment(true);
    setDropErrorComments(false);

    try {
      const commentsFromServer = await getComments(selectedPostId);

      setComments(commentsFromServer);
      setLoadingComment(false);
      setShowComments(true);
    } catch (error) {
      setLoadingComment(false);
      setDropErrorComments(true);
    }
  }, []);

  const removeComment = useCallback(async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter((x) => x.id !== commentId));
    } catch (error) {
      setShowComments(false);
      setDropErrorComments(true);
    }
  }, []);

  const addComment = useCallback(async (
    name: string,
    email: string,
    body: string,
    setSpinner: (React.Dispatch<React.SetStateAction<boolean>>),
  ) => {
    setSpinner(true);

    try {
      const newCommnet = await createComment(postId, name, email, body);

      setComments((prev) => {
        return [...prev, newCommnet];
      });
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    };

    fetchUsers();
  }, []);

  const selectedPost = useMemo(() => {
    return posts.find(post => post.id === postId);
  }, [posts, postId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  showUsers={showUsers}
                  setShowUsers={setShowUsers}
                  selectedUser={userId}
                  setSelectedUser={setUserId}
                  fetchPosts={fetchPosts}
                  setPostId={setPostId}
                />
              </div>

              {dropError && (
                <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  Something went wrong!
                </div>
              )}

              <div className="block" data-cy="MainContent">
                {userId === 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {showPosts && (
                  posts.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={posts}
                      postId={postId}
                      setPostId={setPostId}
                      fetchComments={fetchComments}
                      setShowForm={setShowForm}
                    />
                  )
                )}

                {loading && <Loader />}

              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar', {
                'Sidebar--open': postId !== 0,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                selectedPost={selectedPost}
                comments={comments}
                loadingComment={loadingComment}
                showComments={showComments}
                dropErrorComments={dropErrorComments}
                removeComment={removeComment}
                setShowForm={setShowForm}
                showForm={showForm}
                addComment={addComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
