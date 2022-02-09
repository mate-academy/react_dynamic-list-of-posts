import React, { useState, useEffect } from 'react';
import './PostsList.scss';

import { getUserPosts } from '../../api/posts';

type Props = {
  selectPost: (postId: number) => void;
  clearPost: () => void;
  selectedPost: number;
  selectedUser: number;
};

export const PostsList: React.FC<Props> = (props) => {
  const [posts, setPost] = useState<Post[]>([]);

  const {
    selectPost,
    clearPost,
    selectedPost,
    selectedUser,
  } = props;

  useEffect(() => {
    const fetchPosts = async () => {
      const postsFromServer = await getUserPosts(selectedUser);

      setPost(postsFromServer);
    };

    fetchPosts();
  }, [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <>
            <li className="PostsList__item">
              <div>
                <b>
                  {`[User #${post.userId}]: `}
                </b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={post.id === selectedPost
                  ? clearPost
                  : () => {
                    selectPost(+post.id);
                  }}
              >
                {post.id === selectedPost ? 'Close' : 'Open'}
              </button>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};
