import React from 'react';
import { getPostDetails } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({
  userPosts,
  setSelectedPostId,
  selectedPostId,
  setIsPostSelected,
  isPostSelected,
  setSelectedPost,
}) => {
  const handleButton = (postId) => {
    console.log(postId, selectedPostId);
    if (postId !== selectedPostId) {
      setIsPostSelected(true)
      setSelectedPostId(postId)
      getPostDetails(postId, { method: 'GET' })
        .then(selectedPost => setSelectedPost(selectedPost))
    } else {
      setIsPostSelected(false)
      setSelectedPostId(0)
      setSelectedPost(null)
    };
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {userPosts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>{`[User ${post.userId || 'not defined'}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleButton(post.id)}
            >
              {selectedPostId === post.id && isPostSelected
                ? 'Close'
                : 'Open'
                }
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
};
