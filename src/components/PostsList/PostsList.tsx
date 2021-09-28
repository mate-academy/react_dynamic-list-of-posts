import React, { useEffect, useState } from 'react';
import { getPosts, getUserPosts } from '../../api/posts';
import './PostsList.scss';

type Props = {
  selectedUserId: number;
  selectedPostId: number;
  selectPost: (postId :number) => void;
};

export const PostsList: React.FC<Props> = (props) => {
  const { selectedUserId, selectedPostId, selectPost } = props;
  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    if (selectedUserId === 0) {
      getPosts()
        .then(response => setPosts(response));

      return;
    }

    getUserPosts(selectedUserId)
      .then(response => setPosts(response));
  }, [selectedUserId]);

  const handleChange = (id: number) => {
    if (selectedPostId === id) {
      selectPost(0);
    } else {
      selectPost(id);
    }
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
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleChange(post.id)}
            >
              {selectedPostId === post.id
                ? 'Close'
                : 'Open' }
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
