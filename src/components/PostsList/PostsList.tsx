import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';
import './PostsList.scss';

interface Props {
  userId: number;
  handlePostChange: (id: number) => void;
  currentPost: number;
}

export const PostsList: React.FC<Props> = ({ userId, handlePostChange, currentPost }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const fetchedPosts = await (userId ? getUserPosts(userId) : getUserPosts());

      setPosts(fetchedPosts);
      setLoading(false);
    })();
  }, [userId]);

  return (
    <div className="PostsList">
      {loading ? (
        <Loader />
      ) : (
        <>
          {!posts.length ? (
            <h2>No posts yet</h2>
          ) : (
            <>
              <h2>Posts:</h2>

              <ul className="PostsList__list">
                {posts.map(post => (
                  <li key={post.id} className="PostsList__item">
                    <div>
                      <b>
                        [User #
                        {post.userId}
                        ]:
                      </b>
                      {post.title}
                    </div>

                    <button
                      type="button"
                      className="PostsList__button button"
                      onClick={() => handlePostChange(post.id)}
                    >
                      {currentPost === post.id ? 'Close' : 'Open' }
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};
