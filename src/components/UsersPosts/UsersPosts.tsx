import React, { useState } from 'react';

type Props = {
  user: UserWithPosts;
  selectedPostId: number;
  selectPostId: (postId: number) => void;
};

export const UsersPosts: React.FC<Props>
= ({ user, selectedPostId, selectPostId }) => {
  const [isOpen, setToggle] = useState(false);

  const clickHandler = (userPostId: number) => {
    selectPostId(userPostId);
    setToggle(!isOpen);
  };

  return (
    <>
      {user.posts.map((userPost) => (
        <li className="PostsList__item" key={userPost.id}>
          <div>
            <b>{`[User #${userPost.userId}]: `}</b>
            {userPost.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => clickHandler(userPost.id)}
          >
            {isOpen && selectedPostId === userPost.id ? 'Close' : 'Open'}
          </button>
        </li>
      ))}
    </>
  );
};
