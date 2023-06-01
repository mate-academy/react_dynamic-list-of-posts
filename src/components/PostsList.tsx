import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { client } from '../utils/fetchClient';

interface Props {
  handlePostSelect: (post: Post) => void;
  selectedPost: Post | null;
  userId: number
}

export const PostsList: React.FC<Props> = ({
  selectedPost,
  handlePostSelect,
  userId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        const postsData = await client.get<Post[]>(`/posts?userId=${userId}`);

        setPosts(postsData);
      } catch {
        setError(true);

        if (!posts.length) {
          setPosts([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        Something went wrong!
      </div>
    );
  }

  if (!posts.length) {
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => {
            const { id, title } = post;
            const isPostSelected = post === selectedPost;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>
                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': !isPostSelected,
                    })}
                    onClick={() => handlePostSelect(post)}
                  >
                    {isPostSelected ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
