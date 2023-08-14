import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import '../../App.scss';

import classNames from 'classnames';
import { Error } from '../../types/Error';
import { PostsList } from '../PostsList';
import { PostDetails } from '../PostDetails';
import { UserSelector } from '../UserSelector';
import { Loader } from '../Loader';
import { getUsers } from '../../api/users';
import { getPosts } from '../../api/posts';
import { PostContext } from '../context/PostContext';
import { getComments } from '../../api/comment';
import { Post } from '../../types/Post';
import { User } from '../../types/User';

export const PostApp: React.FC = () => {
  const {
    setComments,
  } = React.useContext(PostContext);

  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost]
    = useState<Post | null>(null);
  const [error, setError] = useState(Error.None);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentFormActive, setIsCommentFormActive] = useState(false);

  useEffect(() => {
    setError(Error.None);
    setIsLoading(true);
    getUsers()
      .then(setUsers)
      .catch(() => setError(Error.Load))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setError(Error.None);
    if (selectedUser) {
      setIsLoading(true);
      getPosts(selectedUser?.id)
        .then(setPosts)
        .catch(() => setError(Error.Load))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  useEffect(() => {
    setError(Error.None);
    if (selectedPost) {
      getComments(selectedPost?.id)
        .then(setComments)
        .catch(() => setError(Error.Load))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost?.id]);

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
                  setSelectedUser={setSelectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser
                  && (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )}

                {isLoading && <Loader />}

                {error
                  && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )}

                {selectedUser && !isLoading && (
                  <>
                    {posts.length === 0 ? (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    ) : (
                      <PostsList
                        posts={posts}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                        setIsCommentFormActive={setIsCommentFormActive}
                      />
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
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                selectedPost={selectedPost}
                isCommentFormActive={isCommentFormActive}
                setIsCommentFormActive={setIsCommentFormActive}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
