import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getAllUserPosts } from './api/posts';
import { getCommentsByPostId } from './api/comments';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [listOfUserPosts, setListOfUserPosts] = useState<Post[]>([]);
  const [listOfComments, setListOfComments] = useState<Comment[]>([]);
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingListOfPosts, setLoadingListOfPosts] = useState(false);
  const [noPosts, setNoPosts] = useState(false);
  const [error, setError] = useState(false);
  const [errorComment, setErrorComment] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (error) {
      timer = setTimeout(() => {
        setError(false);
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [error]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setListOfUserPosts([]);
    setSelectedPost(null);

    if (noPosts) {
      setNoPosts(false);
    }

    setLoadingListOfPosts(true);

    getAllUserPosts(user.id)
      .then(response => {
        setListOfUserPosts(response);
        setLoadingListOfPosts(false);

        if (!response.length) {
          setNoPosts(true);
        }
      })
      .catch(() => {
        setError(true);
        setLoadingListOfPosts(false);
      });
  };

  const handlePostSelect = async (id: number) => {
    if (id === -1) {
      setSelectedPost(null);

      return;
    }

    setLoadingPost(true);

    if (listOfUserPosts) {
      const findPost = listOfUserPosts.find(post => post.id === id);

      if (findPost) {
        setSelectedPost(findPost);

        getCommentsByPostId(id)
          .then(res => {
            setListOfComments(res);
          })
          .catch(() => setErrorComment(true))
          .finally(() => {
            setLoadingPost(false);
          });
      }
    } else {
      setErrorComment(true);
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
                  onSelectUser={handleUserSelect}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingListOfPosts && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {listOfUserPosts && !!listOfUserPosts.length && (
                  <PostsList
                    posts={listOfUserPosts}
                    onPostSelect={handlePostSelect}
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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  loading={loadingPost}
                  comments={listOfComments}
                  key={selectedPost?.id}
                  onCommentsListChange={setListOfComments}
                  onErrorSet={setErrorComment}
                  errorComment={errorComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
