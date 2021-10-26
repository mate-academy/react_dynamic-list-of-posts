import React, { useState, useEffect } from 'react';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';

import './PostsList.scss';

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
  const [hasLoad, setHasLoad] = useState(true);

  useEffect(() => {
    (async () => {
      setHasLoad(true);
      const postsFromAPI = await getUserPosts(selectedUserId);

      setPosts(postsFromAPI);
      setHasLoad(false);
    })();
  }, [selectedUserId]);

  if (hasLoad) {
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
            const isSelectedPost = post.id === selectedPostId;

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
                  className="PostsList__button button is-info"
                  onClick={() => onPostSelect(
                    isSelectedPost ? null : post.id,
                  )}
                >
                  {!isSelectedPost ? 'Show' : 'Hide'}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="notification is-danger">
          This user hasn’t posts!
        </p>
      )}
    </div>
  );
};
