import React, { useEffect, useState } from 'react';
import { getPosts, getUserPosts } from '../../api/posts';
import './PostsList.scss';

type Props = {
  selectedUserId: number;
  selectedPostId: number,
  setSelectPostId: (postId: number) => void
};

export const PostsList: React.FC<Props> = (props) => {
  const { selectedUserId, selectedPostId, setSelectPostId } = props;
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
      .then((postFromServer) => setPosts(postFromServer));
  }, [selectedUserId]);

  const handleChange = (id: number) => {
    if (selectedPostId === id) {
      setSelectPostId(0);
    } else {
      setSelectPostId(id);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
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
              onClick={() => handleChange(post.id)}
            >
              {selectedPostId === post.id
                ? 'Close'
                : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
