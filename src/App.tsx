import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { Post } from './types/Post';
import { Errors } from './types/Errors';
import { Comment } from './types/Comment';

import {
  getComments,
  getPosts,
  getUsers,
} from './api/apiActions';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const [selectedUsersPosts, setSelectedUsersPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.noError);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownActive(!isDropDownActive);
  };

  const closeDropDown = () => {
    setIsDropDownActive(false);
  };

  const toggleCommentForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const selectDropDownItem = (user: User, userId: number) => {
    setSelectedUser(user);
    setSelectedUserId(userId);
    setIsDropDownActive(false);
    setSelectedPost(null);
    setComments(null);
  };

  const selectPost = (post: Post) => {
    setSelectedPost(post);
    if (isFormVisible) {
      toggleCommentForm();
    }
  };

  const deSelectPost = () => {
    setSelectedPost(null);
  };

  const extendComments = (commentToPost: Comment) => {
    if (!comments) {
      setComments([commentToPost]);
    } else {
      setComments([...comments, commentToPost]);
    }
  };

  const handleSetComments = (commentsToPull: Comment[]) => {
    setComments(commentsToPull);
  };

  const deleteCommentFromState = (commendId: number) => {
    if (comments) {
      setComments(comments.filter(comment => comment.id !== commendId));
    }
  };

  useEffect(() => {
    getUsers()
      .then(usersFromServer => {
        setUsers(usersFromServer);
      })
      .catch(() => {
        setErrorMessage(Errors.UserApi);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoadingPosts(true);
      setSelectedUsersPosts([]);
      getPosts(selectedUserId)
        .then(postsFromServer => {
          setSelectedUsersPosts(postsFromServer);
        })
        .catch(() => {
          setErrorMessage(Errors.PostApi);
        })
        .finally(() => {
          setIsLoadingPosts(false);
        });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost) {
      setIsLoadingComments(true);

      getComments(selectedPost.id)
        .then(commentsFromServer => {
          setComments(commentsFromServer);
        })
        .catch(() => {
          setErrorMessage(Errors.CommentApi);
        })
        .finally(() => {
          setIsLoadingComments(false);
        });
    }
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
                  isDropDownActive={isDropDownActive}
                  toggleDropDown={toggleDropDown}
                  selectDropDownItem={selectDropDownItem}
                  selectedUserId={selectedUserId}
                  closeDropDown={closeDropDown}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoadingPosts && <Loader />}

                {errorMessage === Errors.PostApi && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {Errors.PostApi}
                  </div>
                )}

                {selectedUser && !errorMessage && (
                  selectedUsersPosts.length
                    ? (
                      <PostsList
                        selectedUsersPosts={selectedUsersPosts}
                        selectPost={selectPost}
                        deSelectPost={deSelectPost}
                        selectedPost={selectedPost}
                      />
                    )
                    : (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  isLoadingComments={isLoadingComments}
                  comments={comments}
                  selectedPost={selectedPost}
                  ErrorMessage={errorMessage}
                  isFormVisible={isFormVisible}
                  toggleCommentForm={toggleCommentForm}
                  extendComments={extendComments}
                  deleteCommentFromState={deleteCommentFromState}
                  handleSetComments={handleSetComments}
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
};
