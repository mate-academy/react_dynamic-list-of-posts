import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { PostsList } from '../components/PostsList';
import { Loader } from '../components/Loader';
import { UserSelector } from '../components/UserSelector';
import { Post } from '../types/Post';
import * as Services from '../utils/fetchClient';

export const PostsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const [error, setError] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);

  const {
    handlePostSelect,
    selectedPost,
    isDetailOpen,
    setIsDetailOpen,
    isFormVisible,
    setIsFormVisible,
  } = useOutletContext<{
    handlePostSelect: Dispatch<SetStateAction<Post | null>>;
    selectedPost: Post | null;
    isDetailOpen: boolean;
    setIsDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isFormVisible: boolean;
    setIsFormVisible: Dispatch<SetStateAction<boolean>>;
  }>();

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      setError('');
      setIsDetailOpen(false);

      Services.client
        .get<Post[]>(`/posts?userId=${userId}`)
        .then(fetchedPosts => {
          setPosts(fetchedPosts);
        })
        .catch(() => setError('Something went wrong!'))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [setIsDetailOpen, userId]);

  return (
    <div className="tile is-child box is-success ">
      <div className="block">
        <UserSelector />
      </div>
      <div className="block" data-cy="MainContent">
        {isLoading && <Loader />}

        {error && (
          <div className="notification is-danger" data-cy="PostsLoadingError">
            Something went wrong!
          </div>
        )}

        {userId && !isLoading && posts.length === 0 && !error && (
          <div className="notification is-warning" data-cy="NoPostsYet">
            No posts yet
          </div>
        )}
        {!isLoading && userId && posts.length > 0 && (
          <PostsList
            posts={posts}
            selectedPost={selectedPost}
            setSelectedPost={handlePostSelect}
            isDetailOpen={isDetailOpen}
            setIsDetailOpen={setIsDetailOpen}
            isFormVisible={isFormVisible}
            setIsFormVisible={setIsFormVisible}
          />
        )}
      </div>
    </div>
  );
};
