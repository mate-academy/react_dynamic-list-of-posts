import React, { useState, useEffect } from 'react';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/api';
import { Loader } from '../components/Loader/Loader';

type Props = {
  selectedUserId: number | null;
  selectedPost: Post [] | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

export const PostsList: React.FC<Props> = ({ selectedUserId, selectedPost, setSelectedPost }) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (selectedUserId !== null) {
      setPosts(null);
      setHasError(false);

      getUserPosts(selectedUserId)
        .then(posts => {
          setPosts(posts);
          setHasError(false);
        })
        .catch(() => {
          setPosts([]);
          setHasError(true);
        });
      }
    }, [selectedUserId]);

    const handlePostClick = (post: Post) => {
      setSelectedPost(post);
    }


  return (
    <div data-cy="PostsList">
    {hasError && (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        Something went wrong!
      </div>
    )}
    <p className="title">Posts:</p>

    {posts === null ? (
      <Loader />
    ) : (
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
        {posts && posts.map(post => (
          <tr data-cy="Post" key={post.id}>
          <td data-cy="PostId">{post.id}</td>

          <td data-cy="PostTitle">
            {post.title}
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
              onClick={() => handlePostClick(post)}
            >
              Open
            </button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
    )}
  </div>
  )
};
