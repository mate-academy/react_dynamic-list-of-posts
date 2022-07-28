import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { getUserPosts, getPosts } from '../../api/posts';

type Props = {
  selectedUserId: number;
  selectedPostId: number | null,
  onPostClick: (postId: number) => void,
  clearDetails: () => void,
};

export const PostsList: React.FC<Props> = ({
  selectedPostId,
  selectedUserId,
  onPostClick,
  clearDetails,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let postsFromServer;

      if (selectedUserId) {
        postsFromServer = await getUserPosts(selectedUserId);
      } else {
        postsFromServer = await getPosts();
      }

      setPosts(postsFromServer);
    };

    fetchPosts();
  }, [selectedUserId]);

  const handleButtons = (postId: number) => {
    if (selectedPostId === postId) {
      clearDetails();
    } else {
      onPostClick(postId);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              sunt aut facere repellat provident occaecati excepturi optio
            </div>
            {selectedPostId === post.id
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => handleButtons(post.id)}
                >
                  Close
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => handleButtons(post.id)}
                >
                  Open
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
