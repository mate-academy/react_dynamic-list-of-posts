import React from 'react';
import './PostsList.scss';
import { UserPost } from '../../react-app-env';
import { PostItem } from '../PostItem/PostItem';

type PostListType = {
  selectedPostId: number,
  postsFromServer: UserPost[],
  setSelectedPostId: (postId: number) => void,
};

export const PostsList: React.FC<PostListType> = ({
  postsFromServer, selectedPostId, setSelectedPostId,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {postsFromServer.map(post => (
          <PostItem
            key={post.id}
            post={post}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
          />
        ))}

      </ul>
    </div>
  );
};
