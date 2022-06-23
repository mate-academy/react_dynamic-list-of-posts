import React from 'react';
import './PostsList.scss';
import { UsersPosts } from '../UsersPosts/UsersPosts';

type Props = {
  users: UserWithPosts[];
  selectedUserId: number;
  selectedPostId: number;
  selectPostId: (postId: number) => void;
};

export const PostsList: React.FC<Props>
= ({
  users,
  selectedUserId,
  selectedPostId,
  selectPostId,
}) => {
  return (

    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {
          !selectedUserId
            ? users.map((user) => (
              (
                <UsersPosts
                  user={user}
                  key={user.id}
                  selectedPostId={selectedPostId}
                  selectPostId={selectPostId}
                />
              )
            ))
            : (
              <UsersPosts
                user={users[selectedUserId - 1]}
                selectedPostId={selectedPostId}
                selectPostId={selectPostId}
              />
            )
        }
      </ul>
    </div>
  );
};
