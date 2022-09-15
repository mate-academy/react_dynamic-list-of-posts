import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  currentUserId: string;
  setSelectedPostId: (postId: string | null) => void;
  selectedPostId: string | null;
};

export const PostsList: React.FC<Props> = ({
  currentUserId,
  selectedPostId,
  setSelectedPostId,
}) => {
  const [postsList, setPostsList] = useState([]);
  const [showLoaderPostsList, setShowLoaderPostsList] = useState(false);

  const loadPostList = async () => {
    setShowLoaderPostsList(true);

    try {
      const posts = await getUserPosts(currentUserId);

      setPostsList(posts);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    } finally {
      setShowLoaderPostsList(false);
    }
  };

  useEffect(() => {
    setSelectedPostId(null);

    loadPostList();
  },
  [currentUserId]);

  const postsListHandle = (postId: string) => {
    if (selectedPostId && postId === selectedPostId) {
      setSelectedPostId(null);
    } else if (selectedPostId && postId !== selectedPostId) {
      setSelectedPostId(postId);
    } else {
      setSelectedPostId(postId);
    }
  };

  return (
    <div className={classNames('PostsList',
      { 'PostsList--empty': !currentUserId })}
    >
      <h2>Posts:</h2>
      {showLoaderPostsList ? (
        <Loader />
      ) : (
        <>
          <p>{`Count posts: ${postsList.length}`}</p>

          <ul className="PostsList__list">
            {postsList.map((post: PostType) => (
              <li
                key={post.id}
                className={classNames('PostsList__item',
                  { 'PostsList__item--active': (post.id === selectedPostId) })}
                data-cy="postDetails"
              >
                <div>
                  <strong>{post.title}</strong>
                  :
                  <br />
                  {`${post.body}`}
                </div>

                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => postsListHandle(post.id)}
                >
                  {(selectedPostId === post.id) ? 'Close' : 'Open'}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
