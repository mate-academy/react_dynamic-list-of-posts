import { useState, useEffect } from 'react';
import { PostsListUI } from '../PostsListUI';
import { Loader } from '../Loader';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

type Props = {
  selectedUserId: number;
  selectedPostId: number;
  onOpenPostDetails: (postId: number) => void;
  onClearPostDetails: () => void;
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  selectedPostId,
  onOpenPostDetails,
  onClearPostDetails,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      setPostsLoading(true);
      setPosts([]);

      const postsFromServer = await getUserPosts(selectedUserId);

      setPosts([...postsFromServer]);
      setPostsLoading(false);
    }

    loadPosts();
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {postsLoading && <Loader />}
      <PostsListUI
        posts={posts}
        selectedPostId={selectedPostId}
        onOpenPostDetails={onOpenPostDetails}
        onClearPostDetails={onClearPostDetails}
      />
    </div>
  );
};
