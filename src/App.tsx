import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsers } from './api/Users';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { getUserPosts } from './api/Posts';
import { createComments, deleteComments, getComments } from './api/Comments';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [postsLoadingError, setPostsLoadingError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentLoadingError, setCommentLoadingError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [addCommentError, setAddCommentError] = useState(false);
  const [lastCommentPayload, setLastCommentPayload] = useState<Omit<Comment, 'id'> | null>(null);


  useEffect(() => {
    getUsers().then(u => setUsers(u));
  }, []);

  const handleSelectUser = (user: User) => {
    setPost(null);
    setSelectedUser(user);

    setLoading(true);
    getUserPosts(user.id)
      .then(posts => setUserPosts(posts))
      .catch(() => setPostsLoadingError(true))
      .finally(() => setLoading(false));
  };

  const handleComments = (p: Post) => {
    setCommentLoading(true);

    getComments(p.id)
      .then(c => setComments(c))
      .catch(() => setCommentLoadingError(true))
      .finally(() => setCommentLoading(false));
  };

  const handleDeleteComments = (comment: Comment) => {
    const prevComments = [...comments];

    setComments(currentComments =>
      currentComments.filter(com => com.id !== comment.id),
    );

    deleteComments(comment.id).catch(() => setComments(prevComments));
  };

  const handleSubmitComments = async (newComment: Comment) => {
    const { postId, name, email, body } = newComment;

    setSubmitLoading(true);

    try {
      const createdComment = await createComments({
        id: 0,
        name,
        email,
        body,
        postId,
      });

      setComments(currentComments => [...currentComments, createdComment]);
      setLastCommentPayload(null);
    } catch {
      setAddCommentError(true);
    } finally {
      setSubmitLoading(false);
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
                  onSelectUser={user => handleSelectUser(user)}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser !== null ? (
                  <p data-cy="NoSelectedUser">{selectedUser.name}</p>
                ) : (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {postsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!loading &&
                  !postsLoadingError &&
                  (userPosts.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={userPosts}
                      userPost={post}
                      onPost={userPost => setPost(userPost)}
                      onComments={handleComments}
                    />
                  ))}
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
                'Sidebar--open': post !== null,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {post !== null && (
                <PostDetails
                  post={post}
                  comments={comments}
                  commentLoading={commentLoading}
                  commentLoadingError={commentLoadingError}
                  onDeleteComments={handleDeleteComments}
                  onSubmitComments={handleSubmitComments}
                  submitLoading={submitLoading}
                  addCommentError={addCommentError}
                  lastCommentPayload={lastCommentPayload}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
