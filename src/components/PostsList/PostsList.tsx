import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import { Post } from '../../types/Post';
import { getPosts, getUserPosts } from '../../api/posts';

type Props = {
  selectedUserId: number;
  selectedPostId: number;
  setSelectedPostId: (postId: number) => void;
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  selectedPostId,
  setSelectedPostId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isOpened, setOpened] = useState(false);

  const loadUsersPosts = (): void => {
    getUserPosts(selectedUserId)
      .then(postsFromServer => {
        setPosts(postsFromServer);
      });
  };

  const loadPosts = (): void => {
    getPosts()
      .then(postsFromServer => {
        setPosts(postsFromServer);
      });
  };

  useEffect(() => {
    if (selectedUserId !== 0) {
      loadUsersPosts();
    } else {
      loadPosts();
    }
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
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
              onClick={() => {
                setSelectedPostId(selectedPostId === post.id ? 0 : post.id);
                setOpened(!isOpened);
              }}
            >
              {selectedPostId === post.id && isOpened ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
