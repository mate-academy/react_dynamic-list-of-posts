import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { getData } from '../api/posts';
import { Post } from '../types/Post';
import { getUserPosts } from '../utils';
import { Loader } from './Loader';
import { PostItem } from './PostItem';

type Props = {
  selectedPost: Post | null,
  setSelectedPost: (id: Post | null) => void,
  setIsCommentLoading: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PostsList: React.FC<Props> = ({
  selectedPost,
  setSelectedPost,
  setIsCommentLoading,
}) => {
  const userId = useMatch('/:userId')?.params?.userId;
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setPosts(null);
    getData<Post>('posts')
      .then((allPosts) => getUserPosts(allPosts, userId))
      .then(setPosts)
      .catch(() => setError(true));
  }, [userId]);

  if (!userId) {
    return (
      <div data-cy="NoSelectedUser">
        No user selected
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Something went wrong!
      </div>
    );
  }

  if (!posts) {
    return <Loader />;
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
          {posts.map(post => (
            <PostItem
              setIsCommentLoading={setIsCommentLoading}
              key={post.id}
              post={post}
              selectedPost={selectedPost}
              setSelectedPost={setSelectedPost}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
