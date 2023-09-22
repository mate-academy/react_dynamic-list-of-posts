import { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PostsList } from '../PostsList';
import { ModalUserContext } from '../ModalUserContext';
import { Post } from '../../types/Post';
import { getPostsByUserId } from '../../api/api';

export const MainContent = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const { modalUser } = useContext(ModalUserContext);

  const showLoad = isLoad && !isError && !posts.length;
  const showError = !isLoad && isError && !posts.length;
  const showPostList = !isLoad && !isError && !!posts.length;
  const showNoPostsYet = !isLoad && !isError && !posts.length;

  useEffect(() => {
    setIsError(false);
    setIsLoad(true);
    if (modalUser) {
      (async () => {
        try {
          const serverPosts = await getPostsByUserId(modalUser.id);

          setPosts(serverPosts);
        } catch {
          setIsError(true);
        } finally {
          setIsLoad(false);
        }
      })();
    }
  }, [modalUser]);

  return (
    <div className="block" data-cy="MainContent">
      {modalUser ? (
        <>
          {showLoad && <Loader />}

          {showError && (
            <div
              className="notification is-danger"
              data-cy="PostsLoadingError"
            >
              Something went wrong!
            </div>
          )}

          {showPostList && <PostsList posts={posts} />}

          {showNoPostsYet && (
            <div
              className="notification is-warning"
              data-cy="NoPostsYet"
            >
              No posts yet
            </div>
          )}
        </>
      ) : (
        <p data-cy="NoSelectedUser">
          No user selected
        </p>
      )}
    </div>
  );
};
