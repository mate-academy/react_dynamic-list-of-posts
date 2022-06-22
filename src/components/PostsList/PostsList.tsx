import React, { useState, useEffect } from 'react';
import { getAllPosts, getUserPosts } from '../../api/posts';
import { Post } from '../../react-app-env';
import './PostsList.scss';

interface Props {
  selectedUserId: number,
  selectedPostId: number,
  setSelectedPostId: (id: number) => void;
}

export const PostsList: React.FC<Props> = ({
  selectedUserId, selectedPostId, setSelectedPostId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (selectedUserId === 0) {
      getAllPosts()
        .then(postsFromServer => setPosts(postsFromServer));
    } else {
      getUserPosts(selectedUserId)
        .then(postsFromServer => setPosts(postsFromServer));
    }
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul
        data-cy="postDetails"
        className="PostsList__list"
      >
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            {selectedPostId === post.id
              ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPostId(0);
                  }}
                  className="PostsList__button button button-active"
                >
                  Close
                </button>
              )
              : (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPostId(post.id);
                  }}
                  className="PostsList__button button"
                >
                  Open
                </button>
              ) }
          </li>
        ))}
      </ul>
    </div>
  );
};
