import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[];
  selectPost: (id: number | null) => void;
  selectedPostId: number | null;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectPost,
  selectedPostId,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map((post) => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId || 'no user'}]:` }</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                if (selectedPostId === post.id) {
                  selectPost(null);
                } else {
                  selectPost(post.id);
                }
              }}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
