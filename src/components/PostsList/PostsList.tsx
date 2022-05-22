import React, { useEffect, useMemo, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';
import { PostItem } from '../PostItem/PostItem';
import './PostsList.scss';

type Props = {
  selectedUserId: number;
  onSelectPostId: (x: number) => void;
  selectedPostId: number | null;
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  onSelectPostId,
  selectedPostId,
}) => {
  const [posts, setPosts] = useState<Post[] | []>([]);

  useEffect(() => {
    const getDataFromServer = async () => {
      const dataFromServer = await getUserPosts();

      setPosts(dataFromServer);
    };

    getDataFromServer();
  }, [selectedUserId]);

  const visiblePosts = useMemo(() => {
    return (selectedUserId === 0)
      ? posts
      : posts.filter(post => post.userId === selectedUserId);
  }, [selectedUserId, posts]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul
        className="PostsList__list"
        data-cy="postDetails"
      >
        {posts.length > 0 ? (
          visiblePosts.map(post => (
            <PostItem
              key={post.id}
              post={post}
              onSelectPostId={onSelectPostId}
              selectedPostId={selectedPostId}
            />
          ))
        ) : <Loader />}
      </ul>
    </div>
  );
};
