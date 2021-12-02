import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[];
  loadPost: (num: number) => void;
  postDetails: Post | null;
  deletePost: () => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  loadPost,
  postDetails,
  deletePost,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => {
        return (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                [User #
                {post.userId}
                ]:
                {' '}
              </b>
              {post.title}
            </div>
            {(postDetails !== null && post.id === postDetails.id) ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => deletePost()}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => loadPost(post.id)}
              >
                Open
              </button>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);
