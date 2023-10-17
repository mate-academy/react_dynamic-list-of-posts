import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers } from './Api/users';
import { Post } from './types/Post';
import { getPosts } from './Api/posts';
import { deleteComment, getComments } from './Api/comments';
import { Comment } from './types/Comment';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isUserLoading, setIsUserLoading] = useState(true);

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [comments, setCcomments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const [apiErrors, setApiErrors] = useState({
    userError: false,
    postError: false,
    commentsError: false,
  });

  const {
    userError,
    postError,
    commentsError,
  } = apiErrors;

  const deleteCommentFromList = useCallback((deletedId: number) => {
    setCcomments(prevComments => prevComments.filter(comment => comment.id
      !== deletedId));
  }, []);

  const addCommentToList = (newComment: Comment) => {
    setCcomments(prevComments => [...prevComments, newComment]);
  };

  const removeComment = (commentId: number) => {
    deleteCommentFromList(commentId);
    deleteComment(commentId)
      .catch(() => {
      });
  };

  const handleSelectUser = (user: User) => {
    if (selectedUser?.id !== user.id) {
      setSelectedPost(null);
    }

    setSelectedUser(user);
  };

  const handleSelectPost = (post: Post | null) => {
    if (selectedPost?.id === post?.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);
    setIsFormVisible(false);
  };

  const loadUsers = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      setApiErrors(prevState => ({ ...prevState, userError: true }));
    }
  };

  const loadPosts = async () => {
    if (selectedUser) {
      setIsUserLoading(true);

      setApiErrors(prevState => ({ ...prevState, postError: false }));
      try {
        const postsFromServer = await getPosts(selectedUser.id);

        setPosts(postsFromServer);
      } catch {
        setApiErrors(prevState => ({ ...prevState, postError: true }));
      } finally {
        setIsUserLoading(false);
      }
    }
  };

  const loadComments = async () => {
    if (selectedPost) {
      setApiErrors(prevState => ({ ...prevState, commentsError: false }));

      setIsCommentsLoading(true);
      setCcomments([]);

      try {
        const commentsFromServer = await getComments(selectedPost.id);

        setCcomments(commentsFromServer);
      } catch {
        setApiErrors(prevState => ({ ...prevState, commentsError: true }));
      } finally {
        setIsCommentsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [selectedUser]);

  useEffect(() => {
    loadComments();
  }, [selectedPost]);

  const isUserError = userError;
  const isNoSelectedUser = !selectedUser && !userError;
  const isLoadingPosts = isUserLoading;
  const isNoPostsYet = !isUserLoading && !posts?.length;
  const hasPosts = !isUserLoading && !!posts?.length;

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
                  onUserSelect={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isUserError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {ErrorMessage.USERS}
                  </div>
                )}

                {isNoSelectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {selectedUser && (
                  <>
                    {isLoadingPosts && (
                      <Loader />
                    )}

                    {postError ? (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        {ErrorMessage.POSTS}
                      </div>
                    ) : (
                      <>
                        {isNoPostsYet && (
                          <div
                            className="notification is-warning"
                            data-cy="NoPostsYet"
                          >
                            No posts yet
                          </div>
                        )}
                        {hasPosts && (
                          <PostsList
                            posts={posts}
                            selectedPost={selectedPost}
                            onPostSelect={handleSelectPost}
                          />
                        )}
                      </>
                    )}
                  </>
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
              'Sidebar', {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  isCommentsError={commentsError}
                  isLoading={isCommentsLoading}
                  isFormVisible={isFormVisible}
                  isDeleteError={commentsError}
                  onDelete={removeComment}
                  onAdd={addCommentToList}
                  showForm={() => setIsFormVisible(true)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
