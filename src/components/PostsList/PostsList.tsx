import React from 'react';
import './PostsList.scss';

type Props = {
  userPosts: Post[];
  userPostDetail: (userId: number) => void;
  selectedPostId: number | undefined;
};

export const PostsList: React.FC<Props> = (props) => {
  const { userPosts, selectedPostId, userPostDetail } = props;

  return (

    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">

        {userPosts.map(post => {
          const { userId, title, id } = post;

          return (
            <li className="PostsList__item" key={id}>
              <div>
                <b>
                  [
                  {`User #${userId}:`}
                  ]
                </b>
                {' '}
                {title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => userPostDetail(id)}
              >
                {selectedPostId === id ? 'Close' : 'Open'}
              </button>
            </li>
          );
        })}

        <li className="PostsList__item">
          <div>
            <b>[User #2]: </b>
            et ea vero quia laudantium autem
          </div>

          <button
            type="button"
            className="PostsList__button button"
          >
            Open
          </button>
        </li>
      </ul>
    </div>
  );
};
