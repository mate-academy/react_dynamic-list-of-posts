import { FC, useEffect, useState } from 'react';
import { getPosts } from '../../api/posts';
import { Post } from '../../types/post';
import './PostsList.scss';

export const PostsList: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(data => setPosts(data));
  }, []);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
            >
              Close
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
