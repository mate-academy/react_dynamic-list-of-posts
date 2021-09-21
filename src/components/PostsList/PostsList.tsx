import React, { useState, useEffect } from 'react';
import { loadAllPosts, loadUserPosts } from '../../api/post';
import './PostsList.scss';

type Props = {
  selectedUserId: number;
  selectedPostId: number;
  onSelectPost: (postId :number) => void;
};

export const PostsList: React.FC<Props> = (props) => {
  const { selectedUserId, selectedPostId, onSelectPost } = props;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (selectedUserId === 0) {
      (async () => {
        const postsFromApi = await loadAllPosts();

        setPosts(postsFromApi);
      })();

      return;
    }

    (async () => {
      const postsFromApi = await loadUserPosts(selectedUserId);

      setPosts(postsFromApi);
    })();
  }, [selectedUserId]);

  const handleClick = (postId: number) => (
    postId === selectedPostId
      ? onSelectPost(0)
      : onSelectPost(postId)
  );

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length > 0 ? (
          <>
            {posts.map(post => (
              <li key={post.id} className="PostsList__item">
                <div>
                  <b>{`[User #${post.userId}]: `}</b>
                  {post.title}
                </div>

                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => handleClick(post.id)}
                >
                  {selectedPostId === post.id
                    ? 'Close'
                    : 'Open'}
                </button>
              </li>
            ))}
          </>
        ) : 'No posts'}
      </ul>
    </div>
  );
};
