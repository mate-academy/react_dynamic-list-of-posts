import React, { useEffect, useState } from 'react';
import './PostsList.scss';
// Components
import { PostCard } from '../PostCard';
// Types
import { Post } from '../../types/Post';
import { ChangeId } from '../../types/ChangeId';
// Api requests
import { getUserPosts } from '../../api/posts';

type Props = {
  selectedUserId: number;
  selectedPostId: number;
  onChangePostId: ChangeId;
};

export const PostsList = React.memo<Props>(
  ({ selectedUserId, selectedPostId, onChangePostId }) => {
    const [posts, setPosts] = useState<[] | Post[]>([]);

    useEffect(() => {
      getUserPosts(selectedUserId)
        .then(receivedPosts => setPosts(receivedPosts));
    }, [selectedUserId]);

    return (
      <div className="PostsList">
        <h2>Posts:</h2>

        <ul className="PostsList__list">
          {posts.map(({ id, userId, body }) => (
            <li key={id} className="PostsList__item">
              <PostCard
                selectedPostId={selectedPostId}
                id={id}
                userId={userId}
                body={body}
                onChangePostId={onChangePostId}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
