import React, { useEffect, useState } from 'react';
import { PostItem } from './PostItem';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Loader } from './Loader';

interface Props {
  userID: number;
  openedPost?: Post | null;
  setOpenedPost: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({
  userID,
  openedPost,
  setOpenedPost,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    client
      .get<Post[]>(`/posts?userId=${userID}`)
      .then(data => {
        setPosts(data);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [userID]);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <div className="notification is-danger" data-cy="PostsLoadingError">
      Something went wrong!
    </div>
  ) : !!posts.length ? (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <PostItem
              post={post}
              key={post.id}
              setOpenedPost={setOpenedPost}
              openedPost={openedPost}
            />
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="notification is-warning" data-cy="NoPostsYet">
      No posts yet
    </div>
  );
};
