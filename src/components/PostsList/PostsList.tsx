import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type Props = {
  selectedUserId: number,
  selectedPostId: number,
  setselectedPostId: (selectedPostId: number) => void,
};

export const PostsList: React.FC<Props> = (
  { selectedUserId, selectedPostId, setselectedPostId },
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getUserPosts(selectedUserId)
      .then(postsFromServer => {
        setPosts(postsFromServer);
        setLoading(false);
      });
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {loading ? 'LOADING...' : (
        <ul className="PostsList__list">
          {posts.map(post => (
            <li
              className="PostsList__item"
              key={post.id}
            >
              <div>
                <b>
                  {`[User #${post.userId}]: `}
                </b>
                {post.title}
              </div>

              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  if (selectedPostId === post.id) {
                    setselectedPostId(post.id);
                  }

                  setselectedPostId(post.id);
                }}
              >
                {selectedPostId !== post.id
                  ? 'OPEN'
                  : 'CLOSE'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
