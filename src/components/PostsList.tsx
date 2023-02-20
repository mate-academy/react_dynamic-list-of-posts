import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/posts';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { Loader } from './Loader';

type Props = {
  selectedUser: User,
  selectedPost: Post | null,
  onSelectPost: (post: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  selectedUser,
  onSelectPost,
  selectedPost,
}) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getUserPosts = async () => {
      setIsLoading(true);
      onSelectPost(null);

      try {
        const allPosts = await getPosts(selectedUser.id);

        setUserPosts(allPosts);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getUserPosts();
  }, [selectedUser]);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Something went wrong!
      </div>
    );
  }

  if (!userPosts.length) {
    return (
      <div
        className="notification is-warning"
        data-cy="NoPostsYet"
      >
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {userPosts.map(post => (
            <tr
              key={post.id}
              data-cy="Post"
            >
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                {selectedPost?.id === post.id
                  ? (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link"
                      onClick={() => onSelectPost(null)}
                    >
                      Close
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => onSelectPost(post)}
                    >
                      Open
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
