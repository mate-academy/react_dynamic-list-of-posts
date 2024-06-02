import classNames from 'classnames';
import { PostsList } from '../components/PostsList';
import { PostDetails } from '../components/PostDetails';
import { Loader } from '../components/Loader';
import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../types/Post';
import * as Services from '../utils/fetchClient';
import { UserSelector } from '../components/UserSelector';

export const PostsPage = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const [error, setError] = useState<SetStateAction<string>>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
  }, [userId]);

  const handlePostSelect = (post: SetStateAction<Post | null>) => {
    setSelectedPost(post);
    setIsDetailOpen(post !== null);
  };

  return (
    <>
      <div className="tile is-child box is-success">
        <div className="block">
          <UserSelector />
        </div>
        {isLoading && <Loader />}
        <div className="block" data-cy="MainContent">
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

          {userId && posts.length > 0 && (
            <PostsList
              posts={posts}
              selectedPost={selectedPost}
              setSelectedPost={handlePostSelect}
              isDetailOpen={isDetailOpen}
              setIsDetailOpen={setIsDetailOpen}
            />
          )}
        </div>
      </div>
      <div
        data-cy="Sidebar"
        className={classNames('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
          'Sidebar--open': isDetailOpen,
        })}
      >
        <div className="tile is-child box is-success ">
          <PostDetails selectedPost={selectedPost} />
        </div>
      </div>
    </>
  );
};
