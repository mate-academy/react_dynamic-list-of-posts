import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';
import { Loader } from '../Loader';

type Props = {
  selectedUserId: string;
  selectedPostId: number | null;
  onPostSelect: (value: number | null) => void;
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  selectedPostId,
  onPostSelect,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const postsFromAPI = await getUserPosts(selectedUserId);

      setPosts(postsFromAPI);
      setIsLoading(false);
    })();
  }, [selectedUserId]);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {posts.length ? (
        <ul className="PostsList__list">
          {posts.map(post => {
            const isPostSelected = post.id === selectedPostId;

            return (
              <li
                key={post.id}
                className="PostsList__item"
              >
                <div>
                  <b>{`[User #${post.userId}]: `}</b>
                  {post.title}
                </div>
                <button
                  type="button"
                  className={classNames(
                    'PostsList__button button',
                    {
                      'button--active': isPostSelected,
                    },
                  )}
                  onClick={() => onPostSelect(
                    isPostSelected ? null : post.id,
                  )}
                >
                  {isPostSelected ? 'Close' : 'Open'}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>This user has no posts</p>
      )}
    </div>
  );
};
