import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import * as postService from './utils/apiRequests';
import { User } from './types/User';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeCommentTab, setActiveCommentTab] = useState<boolean>(false);
  const [comments, setComments] = useState<Omit<Comment, 'id'>[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showList, setShowList] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    postService.getUsers()
      .then((response) => setUsers(response))
      .catch(() => setHasError(true));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoader(true);
      postService.getPosts(selectedUser.id)
        .then(data => {
          setPosts(data);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost) {
      setShowList(true);
      postService.getComments(selectedPost.id).then((data) => {
        setComments(data);
      }).finally(() => setShowList(false));
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
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">

                {loader && <Loader />}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                <div className="block" data-cy="MainContent">
                  {!loader && selectedUser && posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      setActiveTab={setActiveCommentTab}
                      selectedPost={selectedPost}
                      setSelectedPost={setSelectedPost}
                    />
                  )}
                  {!loader && posts.length === 0 && selectedUser && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}
                  {!loader && !selectedUser && (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )}
                </div>
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
              'Sidebar--open',
            )}
          >
            {activeCommentTab && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  comments={comments}
                  selectedPost={selectedPost}
                  setComments={setComments}
                  showList={showList}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
