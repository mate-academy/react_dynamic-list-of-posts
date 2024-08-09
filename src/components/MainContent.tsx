import React from 'react';
import { useValues } from '../SharedContext';
import { Loader } from './Loader';
import { PostsList } from './PostsList';
import { Messages } from './constants/Messages';
import { Notification } from './Notification';

export const MainContent = () => {
  const { posts, selectedUser, isLoadingPosts, isError } = useValues();

  let mainContent: React.JSX.Element;

  if (isLoadingPosts) {
    mainContent = <Loader />;
  } else if (!selectedUser) {
    mainContent = <p data-cy="NoSelectedUser">No user selected</p>;
  } else if (isError) {
    mainContent = (
      <Notification
        errorMessage={Messages.commentsError}
        dataCy={'PostsLoadingError'}
      />
    );
  } else if (!posts.length) {
    mainContent = (
      <Notification errorMessage={Messages.noPostsYet} dataCy={'NoPostsYet'} />
    );
  } else {
    mainContent = <PostsList />;
  }

  return (
    <div className="block" data-cy="MainContent">
      {mainContent}
    </div>
  );
};
