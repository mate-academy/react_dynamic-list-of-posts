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
  const [usersFromServer, setUseesFromServer] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoader, setIsUserLoad] = useState(true);

  const [postsFromServer, setPostsFromServer] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [comments, setCcomments] = useState<Comment[]>([]);
  const [isCommentsLoader, setIsCommentsLoad] = useState(false);

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
      const users = await getUsers();

      setUseesFromServer(users);
    } catch {
      setApiErrors((prevState) => ({ ...prevState, userError: true }));
    }
  };

  const loadPosts = async () => {
    if (selectedUser) {
      setIsUserLoad(true);

      setApiErrors((prevState) => ({ ...prevState, postError: false }));
      try {
        const posts = await getPosts(selectedUser.id);

        setPostsFromServer(posts);
      } catch {
        setApiErrors((prevState) => ({ ...prevState, postError: true }));
      } finally {
        setIsUserLoad(false);
      }
    }
  };

  const LoadComments = async () => {
    if (selectedPost) {
      setApiErrors((prevState) => ({ ...prevState, commentsError: false }));

      setIsCommentsLoad(true);
      setCcomments([]);

      try {
        const commentsFromServer = await getComments(selectedPost.id);

        setCcomments(commentsFromServer);
      } catch {
        setApiErrors((prevState) => ({ ...prevState, commentsError: true }));
      } finally {
        setIsCommentsLoad(false);
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
    LoadComments();
  }, [selectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={usersFromServer}
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
                    {isUserLoader && (
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
                        {!isUserLoader
                          && postsFromServer
                          && !postsFromServer.length
                          && (
                            <div
                              className="notification is-warning"
                              data-cy="NoPostsYet"
                            >
                              No posts yet
                            </div>
                          )}
                        {!isUserLoader
                          && postsFromServer
                          && postsFromServer.length > 0
                          && (
                            <PostsList
                              posts={postsFromServer}
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
                  isLoader={isCommentsLoader}
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
