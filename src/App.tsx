import React, { useState, useEffect } from 'react';
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
    deleteCommentError: false,
  });

  const {
    userError,
    postError,
    commentsError,
    deleteCommentError,
  } = apiErrors;

  const deleteCommentFromList = (deletedId: number) => {
    setCcomments(comments.filter(comment => comment.id !== deletedId));
  };

  const addCommentToList = (newComment: Comment) => {
    setCcomments((prevComments) => [...prevComments, newComment]);
  };

  const removeComment = (commentId: number) => {
    setApiErrors((prevState) => ({ ...prevState, deleteCommentError: false }));
    deleteCommentFromList(commentId);
    deleteComment(commentId)
      .catch(() => {
        setCcomments(comments);
        setApiErrors(
          (prevState) => ({ ...prevState, deleteCommentError: true }),
        );
      });
  };

  const handleSelectUser = (user: User) => {
    if (selectedUser?.id !== user.id) {
      setSelectedPost(null);
    }

    setSelectedUser(user);
  };

  const handleIsForm = (isForm: boolean) => {
    setIsFormVisible(isForm);
  };

  const handleSelectPost = (post: Post | null) => {
    if (selectedPost?.id === post?.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);
    setIsFormVisible(false);
    setApiErrors((prevState) => ({ ...prevState, deleteCommentError: false }));
  };

  const loadUsers = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      setApiErrors((prevState) => ({ ...prevState, userError: true }));
    }
  };

  const loadPosts = async () => {
    if (selectedUser) {
      setIsUserLoading(true);

      setApiErrors((prevState) => ({ ...prevState, postError: false }));
      try {
        const postsFromServer = await getPosts(selectedUser.id);

        setPosts(postsFromServer);
      } catch {
        setApiErrors((prevState) => ({ ...prevState, postError: true }));
      } finally {
        setIsUserLoading(false);
      }
    }
  };

  const loadComments = async () => {
    if (selectedPost) {
      setApiErrors((prevState) => ({ ...prevState, commentsError: false }));

      setIsCommentsLoading(true);
      setCcomments([]);

      try {
        const commentsFromServer = await getComments(selectedPost.id);

        setCcomments(commentsFromServer);
      } catch {
        setApiErrors((prevState) => ({ ...prevState, commentsError: true }));
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
                {userError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {ErrorMessage.USERS}
                  </div>
                )}

                {!selectedUser && !userError && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {selectedUser && (
                  <>
                    {isUserLoading && (
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
                        {!isUserLoading && !posts?.length
                          && (
                            <div
                              className="notification is-warning"
                              data-cy="NoPostsYet"
                            >
                              No posts yet
                            </div>
                          )}
                        {!isUserLoading && !!posts?.length && (
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
                  isDeleteError={deleteCommentError}
                  onDelete={removeComment}
                  onAdd={addCommentToList}
                  showForm={handleIsForm}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
