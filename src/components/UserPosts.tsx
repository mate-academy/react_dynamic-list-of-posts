import { useContext } from 'react';

import { UserSelector } from './UserSelector/UserSelector';
import { StateContext } from '../store';
import { Loader, NotificationBlock } from './common';
import { Posts } from './Posts/Posts';

export const UserPosts: React.FC = () => {
  const {
    common: { isLoading, errorMessage },
    users: { selectedUser },
    posts: { selectedPost },
  } = useContext(StateContext);

  const isUserSelected = !!selectedUser;
  const isPostSelected = !!selectedPost;

  const isShowPosts = isPostSelected || (!isLoading && !errorMessage);

  return (
    <>
      <div className="tile is-parent">
        <div className="tile is-child box is-success">
          <div className="block">
            <UserSelector />
          </div>

          <div className="block" data-cy="MainContent">
            {!isUserSelected && (
              <Loader />
            )}

            {!isPostSelected && (
              <NotificationBlock dataCy="PostsLoadingError" />
            )}

            {isShowPosts && (
              <Posts />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
