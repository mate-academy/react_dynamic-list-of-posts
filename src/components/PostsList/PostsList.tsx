import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

type Props = {
  userId: number,
  selectedPostId: number,
  setPostId: (postId: number) => void,
};

export const PostsList: React.FC<Props> = ({
  userId, setPostId, selectedPostId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = async () => {
    const postsFromServer = await getUserPosts(userId);

    setPosts(postsFromServer);
  };

  useEffect(() => {
    loadPosts();
  }, [userId]);

  const openPost = (postId: number) => {
    setPostId(postId);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
              {post.body}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={post.id !== selectedPostId
                ? (() => openPost(post.id))
                : (() => openPost(0))}
            >
              {selectedPostId === post.id ? 'Hide' : 'Show'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
