import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { User } from './types/User';
import { getPost } from './api/post';
import { Post } from './types/Post';
import { getComment } from './api/comments';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [choosePost, setChoosePost] = useState(false);
  const [comment, setComment] = useState<Comment[]>([]);
  const [postForComment, setPostForComment] = useState<Post | null>(null);
  const [isLoaderUser, setIsLoaderUser] = useState(false);
  const [isSelectedUser, setIsSelectedUser] = useState(true);
  const [isErrorComment, setIsErrorComment] = useState(false);
  const [loaderComment, setLoaderComment] = useState(false);
  const [isNewComment, setIsNewComment] = useState(false);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const chooseUser = (id: number) => {
    setIsSelectedUser(false);
    setIsLoaderUser(true);
    getPost().then((data) => {
      const findPostOnId = data.filter(post => post.userId === id);

      setPosts(findPostOnId);
    })
      .catch((error) => {
        setIsError(true);
        throw error;
      })
      .finally(() => {
        setIsLoaderUser(false);
      });
  };

  const handleComments = (id: number) => {
    setIsErrorComment(false);
    setLoaderComment(true);
    setChoosePost(true);
    getComment().then((data) => {
      const findCommentOnId = data.filter((item) => item.postId === id);

      setComment(findCommentOnId);
    })
      .catch((error) => {
        setIsErrorComment(true);
        throw error;
      })
      .finally(() => {
        setLoaderComment(false);
      });

    const findPost = posts?.find(post => post.id === id);

    if (findPost) {
      setPostForComment(findPost || null);
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="is-ancestor tile">
          <div className="tile is-parent ">
            <div className="tile is-child box is-success ">
              <div className="block">
                <UserSelector
                  users={users}
                  chooseUser={chooseUser}
                  setChoosePost={setChoosePost}
                />
              </div>

              <div className="block " data-cy="MainContent">
                {isSelectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoaderUser
                  ? (<Loader />)
                  : !isError && !isSelectedUser && (
                    <>
                      {posts?.length
                        ? (
                          <PostsList
                            handleComments={handleComments}
                            posts={posts}
                            setChoosePost={setChoosePost}
                            setIsNewComment={setIsNewComment}
                          />
                        )
                        : (
                          <div
                            className="notification is-warning"
                            data-cy="NoPostsYet"
                          >
                            No posts yet
                          </div>
                        )}
                    </>
                  )}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
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
              { 'Sidebar--open': choosePost },
            )}
          >
            <div className="tile is-child box is-success ">
              {comment && (
                <PostDetails
                  comment={comment}
                  isErrorComment={isErrorComment}
                  postForComment={postForComment as Post}
                  loaderComment={loaderComment}
                  isNewComment={isNewComment}
                  setIsNewComment={setIsNewComment}
                  setComment={setComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
