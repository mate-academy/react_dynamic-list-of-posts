import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Comment } from './types/Comment';

export const App = () => {
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [comments, setComments] = useState<Comment[] | undefined>(undefined);
  const [userPosts, setUserPosts] = useState<Post[] | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [select, setSelect] = useState<number | null>(null);
  const [showUsers, setShowUsers] = useState(false);
  const [selectTitle, setSelectTitle] = useState<number | null>(null);
  const [stateCommentButton, setStateCommentButton] = useState(false);
  // const [stateAWriteAComment, setStateAWriteAComment] = useState(false);
  const [errorIsSubmiting, setErrorIsSubmiting] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);
    client
      .get<User[]>('/users')
      .then(respons => {
        setUsers(respons);
      })
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (select === null) {
      setPosts(undefined);

      return;
    }

    setErrorMessage('');
    setIsLoading(true);
    client
      .get<Post[]>('/posts')
      .then(respons => {
        setPosts(respons);
      })
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, [select]);

  useEffect(() => {
    if (selectTitle === null) {
      setComments(undefined);

      return;
    }

    setErrorMessage('');
    setIsLoading(true);
    client
      .get<Comment[]>('/comments')
      .then(setComments)
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, [selectTitle]);

  useEffect(() => {
    setUserPosts(posts?.filter(post => post.userId === select));
  }, [select, posts]);

  const hasPosts = posts?.some(post => post.userId === select);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  select={select}
                  setSelect={setSelect}
                  showUsers={showUsers}
                  setShowUsers={setShowUsers}
                  selectUser={users?.find(user => user.id === select)}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {select === null && !isLoading && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {select && (
                  <div
                    className={classNames('notification is-warning', {
                      'is-hidden': hasPosts,
                    })}
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {select !== null && hasPosts && (
                  <PostsList
                    userPosts={userPosts}
                    selectTitle={selectTitle}
                    setSelectTitle={setSelectTitle}
                    setStateCommentButton={setStateCommentButton}
                    // setStateAWriteAComment={setStateAWriteAComment}
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
              { 'Sidebar--open': select !== null },
            )}
          >
            <div className="tile is-child box is-success">
              <PostDetails
                post={userPosts?.find(userPost => userPost.id === selectTitle)}
                comments={comments?.filter(
                  comment => comment.postId === selectTitle,
                )}
                stateCommentButton={stateCommentButton}
                setStateCommentButton={setStateCommentButton}
                // stateAWriteAComment={stateAWriteAComment}
                // setStateAWriteAComment={setStateAWriteAComment}
                setComments={setComments}
                errorIsSubmiting={errorIsSubmiting}
                setErrorIsSubmiting={setErrorIsSubmiting}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
