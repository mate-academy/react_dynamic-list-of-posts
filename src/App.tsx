import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import * as userService from './api/users';
import * as postService from './api/posts';
import * as commentService from './api/comments';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';

export const App = () => {
  //users State
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();

  //posts State
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoadingPostsError, setIsLoadingPostsError] = useState(false);
  const [isNotHasPosts, setIsNotHasPosts] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post>({
    id: 0,
    title: '',
    body: '',
    userId: 0,
  });

  //comments State
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [userComments, setUserComments] = useState<CommentData[]>([]);
  const [isLoadingCommentsError, setIsLoadingCommentsError] = useState(false);
  const [isNotHasComments, setIsNotHasComments] = useState(false);

  //other State
  const [isSideBarShown, setIsSideBarShown] = useState(false);
  // const [isFaAngleDownLoading, setIsFaAngleDownLoading] = useState(false);

  const [isCommentFormShown, setIsCommentFormShown] = useState(false);
  const [isButtonShown, setIsButtonShown] = useState(false);

  useEffect(() => {
    userService
      .getUsers()
      .then(setUsers)
      .catch(() => {})
      .finally(() => {});
  }, []);

  // useEffect(() => {
  //   if (!currentUser?.id) {
  //     setUserPosts([]);
  //     setCurrentPost({ id: 0, title: '', body: '', userId: 0 });

  //     return;
  //   }

  //   setIsLoadingPosts(true);
  //   setUserPosts([]);
  //   setIsNotHasPosts(false);
  //   setIsLoadingPostsError(false);

  //   postService
  //     .getPosts(currentUser?.id)
  //     .then(resp => {
  //       setUserPosts(resp);
  //       if (resp.length === 0) {
  //         setIsNotHasPosts(true);
  //       }
  //     })
  //     .catch(() => {
  //       setIsLoadingPostsError(true);
  //     })
  //     .finally(() => {
  //       setIsLoadingPosts(false);
  //     });
  // }, [currentUser]);

  function getPostsByUserId(userId: number) {
    setIsLoadingPosts(true);
    setUserPosts([]);
    setIsNotHasPosts(false);
    setIsLoadingPostsError(false);

    postService
      .getPosts(userId)
      .then(resp => {
        setUserPosts(resp);
        if (resp.length === 0) {
          setIsNotHasPosts(true);
        }
      })
      .catch(() => {
        setIsLoadingPostsError(true);
      })
      .finally(() => {
        setIsLoadingPosts(false);
      });
  }

  function getCommentsByPostId(postId: number) {
    setIsLoadingComments(true);
    setUserComments([]);
    setIsNotHasComments(false);
    setIsLoadingCommentsError(false);
    setIsButtonShown(false);

    commentService
      .getComments(postId)
      .then(resp => {
        setUserComments(resp);
        setIsButtonShown(true);
        if (resp.length === 0) {
          setIsNotHasComments(true);
        }
      })
      .catch(() => {
        setIsLoadingCommentsError(true);
      })
      .finally(() => {
        setIsLoadingComments(false);
      });
  }

  async function deleteComment(commentId: number) {
    await commentService.deleteComment(commentId).then(() => {
      setUserComments(currentComments =>
        currentComments?.filter(comment => comment.id !== commentId),
      );
    });
  }

  function createComment({ postId, name, email, body }: Comment) {
    return commentService
      .createComment({ postId, name, email, body })
      .then(newComment => {
        setUserComments(currentComments => [...currentComments, newComment]);
      })
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  getPostsByUserId={getPostsByUserId}
                  setIsSideBarShown={setIsSideBarShown}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currentUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {userPosts && userPosts?.length > 0 && (
                  <PostsList
                    userPosts={userPosts}
                    setIsSideBarShown={setIsSideBarShown}
                    currentPost={currentPost}
                    setCurrentPost={setCurrentPost}
                    getCommentsByPostId={getCommentsByPostId}
                    setIsCommentFormShown={setIsCommentFormShown}
                  />
                )}

                {isLoadingPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNotHasPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
              </div>
            </div>
          </div>

          {isSideBarShown && (
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
                  currentPost={currentPost}
                  isLoadingComments={isLoadingComments}
                  userComments={userComments}
                  isLoadingCommentsError={isLoadingCommentsError}
                  isNotHasComments={isNotHasComments}
                  isCommentFormShown={isCommentFormShown}
                  setIsCommentFormShown={setIsCommentFormShown}
                  isButtonShown={isButtonShown}
                  setIsButtonShown={setIsButtonShown}
                  deleteComment={deleteComment}
                  createComment={createComment}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
