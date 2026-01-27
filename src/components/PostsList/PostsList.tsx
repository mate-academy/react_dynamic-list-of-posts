import React, { useEffect, useState } from 'react';
import { client } from '../../utils/fetchClient';
import { User } from '../../types/User';
import { Post } from '../../types/Post';
import { PostItem } from '../PostItem';
import { Loader } from '../Loader';

type Props = {
  selectedUser: User;
  selectedPost: Post | null;
  onSelectPost: (post: Post) => void;
};
export const PostsList: React.FC<Props> = ({
  selectedUser,
  selectedPost,
  onSelectPost = () => {},
}) => {
  const [postsUser, setPostsUser] = useState<Post[]>([]);
  const [hasPostsError, setHasPostsError] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const { id } = selectedUser;

  useEffect(() => {
    setIsLoadingPosts(true);
    setHasPostsError(false);
    client
      .get<Post[]>(`/posts?userId=${id}`)
      .then(postsFromServer => {
        setPostsUser(postsFromServer);
      })
      .catch(() => {
        setHasPostsError(true);
      })
      .finally(() => {
        setIsLoadingPosts(false);
      });
  }, [id]);

  if (isLoadingPosts) {
    return <Loader />;
  }

  if (hasPostsError) {
    return (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        Something went wrong!
      </div>
    );
  }

  if (postsUser.length === 0) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {postsUser.map(post => (
            <PostItem
              key={post.id}
              post={post}
              selectedPost={selectedPost}
              onSelectPost={onSelectPost}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
