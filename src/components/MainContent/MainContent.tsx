import { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PostsList } from '../PostsList';
import { ModalUserContext } from '../ModalUserContext';
import { Post } from '../../types/Post';
import { getPostsByUserId } from '../../api/api';
import { getWhatToShow } from '../../utils/helpers';

export const MainContent = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const { modalUser } = useContext(ModalUserContext);

  const {
    isShowLoad,
    isShowError,
    isShowContent,
    isShowNoContent,
  } = getWhatToShow(isError, isLoad, !!posts.length);

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
          {isShowLoad && <Loader />}

          {isShowError && (
            <div
              className="notification is-danger"
              data-cy="PostsLoadingError"
            >
              Something went wrong!
            </div>
          )}

          {isShowContent && <PostsList posts={posts} />}

          {isShowNoContent && (
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
