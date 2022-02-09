import React from 'react';
import './PostsList.scss';

type Props = {
  listOfPosts: Post[];
  handleOpenPostDetails: (postId: number) => void;
  postId: number;
};

export const PostsList: React.FC<Props> = ({
  listOfPosts,
  handleOpenPostDetails,
  postId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {listOfPosts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.body}
          </div>
          {postId === post.id ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleOpenPostDetails(0)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleOpenPostDetails(post.id)}
            >
              Open
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
