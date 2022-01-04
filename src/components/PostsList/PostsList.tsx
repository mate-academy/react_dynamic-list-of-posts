import React, { useState, useEffect } from 'react';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';
import { Loader } from '../Loader/Loader';

type Props = {
  selectedUserId: number;
  selectedPostId: number;
  selectPost: (postId: number) => void;
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  selectedPostId,
  selectPost,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    getUserPosts(selectedUserId)
      .then(loadedPosts => {
        setPosts(loadedPosts);
        setLoadingStatus(false);
      });
  }, [selectedUserId]);

  if (loadingStatus) {
    return (<Loader />);
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {!posts.length && (
        <div>Posts Not Found</div>
      )}
      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                {`[User #${post.userId}]:`}
              </b>
              {post.title}
            </div>

            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                selectPost(selectedPostId === post.id ? 0 : post.id);
              }}
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
