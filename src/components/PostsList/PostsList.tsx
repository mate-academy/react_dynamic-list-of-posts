import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  selectedUserId: number;
  selectPostId: (postId: number) => void;
  changePostDetailsVisibility: () => void;
  selectedPostId: number;
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  selectPostId,
  changePostDetailsVisibility,
  selectedPostId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  const loadPosts = async () => {
    const postsFromServer = await getUserPosts(selectedUserId);

    setPosts(postsFromServer);
    setIsLoaderVisible(false);
  };

  useEffect(() => {
    setIsLoaderVisible(true);
    loadPosts();
  }, [selectedUserId]);

  const handleDetailButtonClick = (postId: number) => {
    selectPostId(postId);

    if (!selectedPostId) {
      changePostDetailsVisibility();
    }

    if (selectedPostId === postId) {
      changePostDetailsVisibility();
      selectPostId(0);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {isLoaderVisible ? (<Loader />) : (
        <ul className="PostsList__list">
          {posts.map(post => (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              <button
                type="button"
                className={classNames(
                  'PostsList__button',
                  'button',
                  { 'PostsList__button--selected': post.id === selectedPostId },
                )}
                onClick={() => handleDetailButtonClick(post.id)}
              >
                {post.id === selectedPostId ? 'Close' : 'Open'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
