import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [sideBarOpened, setSideBarOpened] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoadingPosts(true);
      setHasLoadingError(false);

      try {
        const postsFromServer: Post[] = await client.get(`/posts?userId=${userId}`);

        setIsLoadingPosts(false);
        setPosts(postsFromServer);
      } catch (error) {
        setHasLoadingError(true);
        setIsLoadingPosts(false);
      }
    };

    loadPosts();
  }, [userId]);

  const selectedPost = useMemo(() => {
    return posts.find(post => post.id === selectedPostId) || null;
  }, [selectedPostId]);

  useEffect(() => {
    setSideBarOpened(false);
  }, [userId]);

  const closeDropDown = useCallback(() => {
    if (isDropdownOpened) {
      setIsDropdownOpened(false);
    }
  }, [isDropdownOpened]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpened(!isDropdownOpened);
  }, [isDropdownOpened]);

  useEffect(() => {
    setSelectedPostId(0);
  }, [userId]);

  return (
    <main
      className="section"
      onClick={closeDropDown}
      aria-hidden="true"
    >
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setUserId={setUserId}
                  userId={userId}
                  isDropdownOpened={isDropdownOpened}
                  onCloseDropdown={closeDropDown}
                  onToggle={toggleDropdown}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {(!userId && !hasLoadingError) && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {Boolean(userId) && (
                  <>
                    {Boolean(isLoadingPosts) && (<Loader />)}

                    {Boolean(hasLoadingError) && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {(
                      posts.length === 0
                      && Boolean(userId)
                      && !isLoadingPosts
                      && !hasLoadingError
                    ) && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {(posts.length > 0 && !isLoadingPosts)
                      && (
                        <PostsList
                          posts={posts}
                          setSideBarOpened={setSideBarOpened}
                          sideBarOpened={sideBarOpened}
                          setSelectedPostId={setSelectedPostId}
                          selectedPostId={selectedPostId}
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
              { 'Sidebar--open': sideBarOpened },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
