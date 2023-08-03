import React from 'react';
import { UserSelector } from './UserSelector';
import PostWidgetContent from './PostWidgetContent';

const PostWidget:React.FC = () => {
  return (
    <div className="tile is-parent">
      <div className="tile is-child box is-success">
        <div className="block">
          <UserSelector />
        </div>

        <div className="block" data-cy="MainContent">
          <PostWidgetContent />
        </div>
      </div>
    </div>
  );
};

export default PostWidget;
