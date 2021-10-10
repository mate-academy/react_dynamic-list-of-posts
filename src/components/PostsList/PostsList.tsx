import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/post';
import './PostsList.scss';
import { Post } from '../../react-app-env';

type Props = {
  userId: number;
  onPostSelect: (postId:number) => void;
  postId: number;
};

export const PostsList: React.FC<Props> = ({ userId, onPostSelect, postId }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getUserPosts(userId)
      .then(result => setPosts(result));
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
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
              onClick={() => (postId === post.id ? onPostSelect(0) : onPostSelect(post.id))}
            >
              {postId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
