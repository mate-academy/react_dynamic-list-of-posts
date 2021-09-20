import React from 'react';
import './PostsList.scss';

interface Props {
  posts: Post[];
  selectedPostId: number;
  selectPostId: (id: number) => void;
}

export const PostsList: React.FC<Props> = (props) => {
  const { posts, selectedPostId, selectPostId } = props;

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length > 0 ? (
          posts.map(post => (
            <li key={post.id} className="PostsList__item">
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.body}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (selectedPostId === post.id) {
                    selectPostId(0);
                  } else {
                    selectPostId(post.id);
                  }
                }}
                className="PostsList__button button"
              >
                {selectedPostId === post.id ? 'Close' : 'Open'}
              </button>
            </li>
          ))
        ) : (
          <h3>There are no posts yet</h3>
        )}
      </ul>
    </div>
  );
};
