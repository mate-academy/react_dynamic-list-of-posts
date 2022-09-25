import React, { useEffect, useState } from 'react';
import { Post } from '../../types/Post';
import { getPosts } from '../../utils/fetch_Posts';
import { Loader } from '../Loader';
import './PostList.scss';

type Props = {
  selectedPostId: number | null,
  setSelectedPostId: React.Dispatch<React.SetStateAction<number | null>>,
  selectedUserId: number | null,
};

export const PostsList: React.FC<Props> = ({
  selectedPostId,
  setSelectedPostId,
  selectedUserId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostOpened, setIsPostOpened] = useState(false);
  const [postsLoadingError, setPostsLoadingError] = useState('');
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);

  useEffect(() => {
    setIsPostsLoaded(false);
    setSelectedPostId(null);
    setPosts([]);

    getPosts()
      .then(postsFromApi => {
        setPosts(postsFromApi.filter(post => post.userId === selectedUserId));
        setIsPostsLoaded(true);
      })
      .catch(() => setPostsLoadingError('Something went wrong!'));
  }, [selectedUserId]);

  const handleOpenBtnClick = (post: Post) => {
    setSelectedPostId(post.id);
    setIsPostOpened(true);
  };

  const handleCloseBtnClick = () => {
    setSelectedPostId(null);
    setIsPostOpened(false);
  };

  return (
    <div
      data-cy="PostsList"
      className={
        !selectedPostId
          ? 'PostList-stretch'
          : ''
      }
    >
      {postsLoadingError
    && (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        {postsLoadingError}
      </div>
    )}

      {!isPostsLoaded
     && <Loader />}

      {(isPostsLoaded && posts.length > 0)
          && (
            <>
              <p className="title">Posts:</p>

              <table
                className="
                  table is-fullwidth is-striped is-hoverable is-narrow
                "
              >
                <thead>
                  <tr className="has-background-link-light">
                    <th>#</th>
                    <th>Title</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr data-cy="Post" key={post.id}>
                      <td data-cy="PostId">{post.id}</td>

                      <td data-cy="PostTitle">
                        {post.title}
                      </td>

                      <td className="has-text-right is-vcentered">
                        {(!isPostOpened || post.id !== selectedPostId)
                    && (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-light"
                        onClick={() => handleOpenBtnClick(post)}
                      >
                        Open
                      </button>
                    )}
                        {(post.id === selectedPostId && isPostOpened)
                    && (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link"
                        onClick={() => handleCloseBtnClick()}
                      >
                        Close
                      </button>
                    )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

      {(isPostsLoaded && !posts.length)
            && (
              <div className="notification is-warning" data-cy="NoPostsYet">
                No posts yet
              </div>
            )}
    </div>
  );
};
