import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/api';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  selectUserId: number;
  selectPostId: number;
  setSelectPostId: (postId: number) => void;
};

export const PostsList: React.FC<Props> = ({ selectUserId, selectPostId, setSelectPostId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserPosts(selectUserId)
      .then(post => {
        setPosts(post);
        setLoading(false);
      });
  }, [selectUserId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {posts.length
        ? (
          <ul className="PostsList__list">
            {posts.map(post => (
              <li
                key={post.id}
                className="PostsList__item"
              >
                <div>
                  <b>
                    {`[User #${post.userId}]:`}
                  </b>
                  {post.title}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => (
                    setSelectPostId(selectPostId === post.id ? 0 : post.id)
                  )}
                >
                  {selectPostId === post.id
                    ? 'Close'
                    : 'Open'}
                </button>
              </li>
            ))}
          </ul>
        )
        : <div>Not found</div>}
    </div>
  );
};
