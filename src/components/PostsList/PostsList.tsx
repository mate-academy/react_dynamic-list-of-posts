import React from 'react';
import './PostsList.scss';

interface Props {
  posts: Post[],
  selectedPostId: string,
  handleSetSelectedPostId: any,
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  handleSetSelectedPostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(({ id, userId, title }) => (
        <li
          key={id}
          className="PostsList__item"
        >
          <div>
            <b>
              [User #
              {userId}
              ]:
            </b>
            {title}
          </div>
          {+selectedPostId === id
            ? (
              <button
                type="button"
                className="PostsList__button button active"
                onClick={(event) => handleSetSelectedPostId(event, '')}
              >
                Close
              </button>
            )
            : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={(event) => handleSetSelectedPostId(event, id)}
              >
                Open
              </button>
            )}
        </li>
      ))}
    </ul>
  </div>
);
