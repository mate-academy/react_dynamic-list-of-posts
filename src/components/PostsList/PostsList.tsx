import React from 'react';
import './PostsList.scss';

type Props = {
  postsToShow: Post[];
  selectedPostId: number;
  setSelectedPostId: (id:number) => void;
};

export const PostsList: React.FC<Props> = ({
  postsToShow,
  selectedPostId,
  setSelectedPostId,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul
        className="PostsList__list"
        data-cy="postDetails"
      >

        {postsToShow.map(post => {
          const { id, userId, title } = post;

          return (
            <li
              key={id}
              className="PostsList__item"
            >
              <div>
                <b>
                  [
                  User #
                  {userId}
                  ]:
                </b>
                {title}
              </div>

              {selectedPostId === id
                ? (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => setSelectedPostId(0)}
                  >
                    Close
                  </button>
                )
                : (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => setSelectedPostId(id)}
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
};
