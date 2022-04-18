import React, { useEffect, useState } from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

interface Props {
  selectedUserId: number,
  selectedPostId: number,
  onSelectPostId: (postId: number) => void,
}

export const PostsList: React.FC<Props> = React.memo(({
  selectedUserId,
  selectedPostId,
  onSelectPostId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = () => {
      getUserPosts(selectedUserId)
        .then(loadedPosts => setPosts(loadedPosts));
    };

    loadPosts();
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {posts.length
        ? (
          <ul className="PostsList__list">
            {posts.map(post => (
              <li
                className="PostsList__item"
                key={post.id}
              >
                <div>
                  <b>{`[User ${post.userId}]: `}</b>
                  {post.title}
                </div>

                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={post.id !== selectedPostId
                    ? () => onSelectPostId(post.id)
                    : () => onSelectPostId(0)}
                >
                  {post.id !== selectedPostId
                    ? 'Open'
                    : 'Close'}
                </button>
              </li>
            ))}
          </ul>
        )
        : (
          <p>Not posts</p>
        )}
    </div>
  );
});
