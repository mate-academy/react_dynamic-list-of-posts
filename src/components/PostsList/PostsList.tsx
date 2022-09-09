import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  currentUserId: string;
  setSelectedPostId: (postId: string) => void;
  selectedPostId: string;
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
      setShowLoaderPostsList(false);
    } catch (error) {
      setShowLoaderPostsList(false);
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('mounted', currentUserId);
    setSelectedPostId('');

    loadPostList();

    // eslint-disable-next-line no-console
    console.log('postsList = ', postsList);
  },
  [currentUserId]);

  const postsListHandle = (postId: string) => {
    // eslint-disable-next-line no-console
    console.log('postId =', postId);

    // eslint-disable-next-line no-console
    console.log('selectedPostId before = ', selectedPostId);

    switch (true) {
      case selectedPostId && postId === selectedPostId:
        setSelectedPostId('');
        // setShowPostDetails(false);
        // eslint-disable-next-line no-console
        console.log('postId === selectedPostId', postId, selectedPostId);
        break;

      case selectedPostId && postId !== selectedPostId:
        setSelectedPostId(postId);
        // setShowPostDetails(true);
        // eslint-disable-next-line no-console
        console.log('postId !== selectedPostId', postId, selectedPostId);
        break;

      default:
        setSelectedPostId(postId);
        // eslint-disable-next-line no-console
        console.log('selectedPostId undefined =', postId, selectedPostId);
    }

    // eslint-disable-next-line no-console
    console.log('selectedPostId after =', selectedPostId);
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
            {postsList.map((post: Post) => (
              <li
                key={post.id}
                className={classNames('PostsList__item',
                  { 'PostsList__item--active': (post.id === selectedPostId) })}
                data-cy="postDetails"
              >
                <div>
                  {/* <b>{`[User #${post.userId}]: `}</b> */}
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
