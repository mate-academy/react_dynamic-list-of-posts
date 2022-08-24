import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  currentUser: string;
  setSelectedPostId: (postId: string) => void;
  selectedPostId: string;
  setShowPostDetails: (value: boolean) => void;
  // downLoadComments: (id: string) => void;
  // downloadPostDetails: (postId: string) => void;
};

export const PostsList: React.FC<Props> = ({
  currentUser,
  selectedPostId,
  setSelectedPostId,
  setShowPostDetails,
  // downLoadComments,
  // downloadPostDetails,
}) => {
  const [postsList, setPostsList] = useState([]);
  const [showLoaderPostsList, setShowLoaderPostsList] = useState(true);

  const loadData = async () => {
    setShowLoaderPostsList(true);

    try {
      const posts = await getUserPosts(currentUser);

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
    console.log('mounted', currentUser);

    loadData();

    // eslint-disable-next-line no-console
    console.log(postsList);
  },
  [currentUser]);

  const postsListHandle = (postId: string) => {
    // eslint-disable-next-line no-console
    console.log('setSelectedPostId', postId);
    setSelectedPostId(postId);
    setShowPostDetails(true);

    // downLoadComments(postId);
    // downloadPostDetails(postId);
  };

  return (
    <div className="PostsList">
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
                  <b>{`[User #${post.userId}]: `}</b>
                  <strong>{post.title}</strong>
                  :
                  <br />
                  {post.body}
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
