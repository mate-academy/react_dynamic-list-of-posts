import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { getPosts, getUserPosts } from '../../api/posts';

interface Props {
  selectedUserId: number;
  selectedPostId: number;
  setSelectedPostId: (postId: number) => void;
}

export const PostsList: React.FC<Props> = (props) => {
  const { selectedUserId, selectedPostId, setSelectedPostId } = props;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (selectedUserId === 0) {
      getPosts()
        .then(response => {
          setPosts(response);
        });

      return;
    }

    getUserPosts(selectedUserId)
      .then(response => {
        setPosts(response);
      });
  }, [selectedUserId]);

  const handleChange = (id: number) => {
    if (selectedPostId === id) {
      setSelectedPostId(0);
    } else {
      setSelectedPostId(id);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {!posts.length && (
        <h3>Posts Not Found</h3>
      )}
      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`[User #${post.userId}]: `}
              </b>
              {post.title}
              {post.id}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleChange(+post.id)}
            >
              {selectedPostId === +post.id
                ? 'Close'
                : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
