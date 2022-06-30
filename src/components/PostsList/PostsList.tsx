import React from 'react';
import './PostsList.scss';

interface Props {
  posts: Post[],
  selectedPostId: number,
  getSelectedPost: (postId: number) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  getSelectedPost,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            {selectedPostId === post.id
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => getSelectedPost(0)}
                >
                  Close
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => getSelectedPost(post.id)}
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
