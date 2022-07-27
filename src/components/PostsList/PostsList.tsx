import React from 'react';
import './PostsList.scss';

interface Props {
  posts: Post[]
  selectPost: (postId: number) => void
  selectedPostId: number
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectPost,
  selectedPostId,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul
        className="PostsList__list"
        data-cy="postDetails"
      >
        {
          posts.map(post => (
            <li
              className="PostsList__item"
              key={post.id}
            >
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                <p>{post.title}</p>
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  if (selectedPostId !== post.id || post === null) {
                    selectPost(post.id);
                  } else {
                    selectPost(0);
                  }
                }}
              >
                {selectedPostId === post.id ? 'Close' : 'Open'}
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
