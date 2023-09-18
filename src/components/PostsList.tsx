import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { usePosts } from './Contexts/PostsContext';
import { useSelectedUser } from './Contexts/UserContext';
import { getPosts } from '../api/posts';
import { Post } from '../types/Post';
import { Loader } from './Loader';

type Props = {
  selectedPost: Post | null,
  onSelectPost: (post: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  selectedPost,
  onSelectPost,
}) => {
  const { posts, setPosts } = usePosts();
  const { selectedUser } = useSelectedUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      getPosts(selectedUser.id)
        .then(setPosts)
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  const handleSelectPost = (post: Post) => {
    if (selectedPost && post.id === selectedPost.id) {
      onSelectPost(null);

      return;
    }

    onSelectPost(post);
  };

  return (
    <div data-cy="PostsList">
      {isLoading && (
        <Loader />
      )}
      {(!!posts.length && !isLoading) && (
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
              {posts.map((post) => {
                return (
                  <tr data-cy="Post" key={post.id}>
                    <td data-cy="PostId">{post.id}</td>

                    <td data-cy="PostTitle">
                      {post.title}
                    </td>

                    <td className="has-text-right is-vcentered">
                      <button
                        type="button"
                        data-cy="PostButton"
                        className={classNames('button is-link', {
                          'is-light': selectedPost?.id !== post.id,
                        })}
                        onClick={() => handleSelectPost(post)}
                      >
                        {selectedPost?.id !== post.id ? 'Open' : 'Close'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>

      )}
      {(!posts.length && !isLoading) && (

        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}
    </div>
  );
};
