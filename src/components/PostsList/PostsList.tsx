import React from 'react';
import './PostsList.scss';

interface Props {
  posts: Post[];
  getPostId: (postId: number) => void;
  selectedPostId: number;
}

export const PostsList: React.FC<Props> = (props) => {
  const {
    posts,
    getPostId,
    selectedPostId,
  } = props;

  const handleClick = (postID: number) => {
    if (selectedPostId === postID) {
      getPostId(0);
    } else {
      getPostId(postID);
    }
  };

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
                {`[User ${post.userId} ]:`}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleClick(post.id)}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
