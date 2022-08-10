import React from 'react';
import './PostsList.scss';

type Props = {
  postsList: Post[];
  selectedPostId: string;
  downLoadComments: (id: string) => void;
};

export const PostsList: React.FC<Props> = ({
  postsList,
  selectedPostId,
  downLoadComments,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <p>{`Count posts: ${postsList.length}`}</p>

      <ul className="PostsList__list">
        {postsList.map((post: Post) => (
          <li
            key={post.id}
            className="PostsList__item"
            data-cy="postDetails"
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.id}
              :
              {post.title}
            </div>

            <button
              type="button"
              className="PostsList__button button"
              onClick={() => downLoadComments(post.id)}
            >
              {(selectedPostId === post.id) ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
