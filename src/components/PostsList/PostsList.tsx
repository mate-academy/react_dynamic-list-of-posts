import React from 'react';
import './PostsList.scss';

type Props = {
  users: UserWithPosts[];
};

export const PostsList: React.FC<Props> = ({ users }) => {
  return (

    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {users.map((user) => (
          user.posts.map((userPost) => (
            <li className="PostsList__item" key={userPost.id}>
              <div>
                <b>{`[User #${userPost.userId}]: `}</b>
                {userPost.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
              >
                Close
              </button>
            </li>
          ))
        ))}
      </ul>
    </div>
  );
};
