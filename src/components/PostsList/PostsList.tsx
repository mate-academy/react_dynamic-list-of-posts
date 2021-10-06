import React, { useEffect, useState } from 'react';
import { getPosts, getUserPosts } from '../../api/posts';
import './PostsList.scss';

type Props = {
  selectedUserId: number;
  selectedPostId: number;
  selectPostId: (postId: number) => void;
};

export const PostsList: React.FC<Props> = (props) => {
  const { selectedUserId, selectedPostId, selectPostId } = props;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      if (!selectedUserId) {
        const postsFromAPI = await getPosts();

        setPosts(postsFromAPI);

        return;
      }

      const userPostsFromAPI = await getUserPosts(selectedUserId);

      setPosts(userPostsFromAPI);
    })();
  }, [selectedUserId]);

  const handleClick = (postId: number) => {
    if (selectedPostId === postId) {
      selectPostId(0);
    } else {
      selectPostId(postId);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {!posts.length
        ? <h3>No posts yet</h3>
        : (
          <ul className="PostsList__list">
            {posts.map(post => (
              <li
                className="PostsList__item"
                key={post.id}
              >
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
          </ul>
        )}
    </div>
  );
};
