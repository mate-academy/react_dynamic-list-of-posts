import React, { useEffect, useState } from 'react';
import { getPostsByUserId } from '../../api/loadData';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';

type Props = {
  selectedUserId: number,
  onSelectPost: (post: Post | null) => void,
  selectedPost: Post | null,
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  onSelectPost,
  selectedPost,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);

  const hasNoPosts = posts.length === 0;

  const loadPosts = async () => {
    setIsLoading(true);

    try {
      const loadedPosts = await getPostsByUserId(selectedUserId);

      setPosts(loadedPosts);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsLoadingFinish(true);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [selectedUserId]);

  if (isLoading && selectedUserId !== 0) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Something went wrong!
      </div>
    );
  }

  if (hasNoPosts && isLoadingFinish && selectedUserId) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

  return (
    <div data-cy="PostsList">
      {(isLoadingFinish && !!selectedUserId) && (
        <>
          <p className="title">Posts:</p>

          <table
            className="table is-fullwidth is-striped is-hoverable is-narrow"
          >
            <thead>
              <tr className="has-background-link-light">
                <th>#</th>
                <th>Title</th>
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {posts.map(post => {
                const isSelectedPost = post.id === selectedPost?.id;

                return (
                  <tr data-cy="Post" key={post.id}>
                    <td data-cy="PostId">{post.id}</td>

                    <td data-cy="PostTitle">
                      {post.title}
                    </td>

                    <td className="has-text-right is-vcentered">
                      {isSelectedPost
                        ? (
                          <button
                            type="button"
                            data-cy="PostButton"
                            className="button is-link"
                            onClick={() => onSelectPost(null)}
                          >
                            Close
                          </button>
                        ) : (
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
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
