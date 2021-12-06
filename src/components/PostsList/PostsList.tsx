import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import { getUserPosts } from '../../api/post';
import { Post } from '../../types/Post';

type Props = {
  selectedUserId: number,
  selectedPostId: number,
  selectPost: (postId: number) => void,
};

export const PostsList: React.FC<Props> = (props) => {
  const { selectedUserId, selectedPostId, selectPost } = props;
  const [posts, setPost] = useState([] as Post[]);

  useEffect(() => {
    getUserPosts(selectedUserId)
      .then(postFromServer => setPost(postFromServer));
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length > 0 && (
          posts.map(post => (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>
                  {`User ${post.userId}: `}
                </b>
                {post.title}
              </div>

              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  selectPost(post.id);
                }}
              >
                {selectedPostId === post.id ? 'Close' : 'Open'}
              </button>
            </li>
          ))
        )}

      </ul>
    </div>
  );
};
