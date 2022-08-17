import React, { useEffect, useState } from 'react';
import { getPosts } from '../../api/posts';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  userId: number,
  onPostChange: (postId: number) => void,
  postId: number,
};

export const PostsList: React.FC<Props> = ({
  userId,
  onPostChange,
  postId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const newPosts = await getPosts(userId);

      setPosts(newPosts);
      setLoading(false);
    })();
  }, [userId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {!posts.length ? (
        <p>No posts</p>
      ) : (
        <ul className="PostsList__list">
          {posts.map(post => (
            <li
              key={post.id}
              className="PostsList__item"
            >
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>

              {postId === post.id ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => onPostChange(0)}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => onPostChange(post.id)}
                >
                  Open
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
