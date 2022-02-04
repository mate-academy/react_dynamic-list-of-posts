import React, { useEffect, useState } from 'react';
import { getPosts } from '../../api/posts';
import { PostsListUi } from './PostListUi';
import './PostsList.scss';

type Props = {
  selectedUserId: number,
  selectedPostId: number,
  setSelectePostId: (postId: number) => void
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  selectedPostId,
  setSelectePostId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [initialize, setInitialize] = useState(false);

  const loadData = async () => {
    setPosts(await getPosts(selectedUserId));
    setInitialize(!initialize);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [selectedUserId]);

  return (
    <>
      <PostsListUi
        posts={posts}
        initialize={initialize}
        selectedPostId={selectedPostId}
        setSelectePostId={setSelectePostId}
      />
    </>
  );
};
