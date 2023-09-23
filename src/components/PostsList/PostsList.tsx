import React, { useEffect, useState } from 'react';
import { usePosts } from '../Contexts/PostsContext';
import { getPosts } from '../../api/posts';
import { PostType } from '../../types/Post';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Post } from '../Post/Post';

type Props = {
  selectedPost: PostType | null,
  selectedUser: User,
  onSelectPost: (post: PostType | null) => void,
  onAddComment: (status: boolean) => void,
  onError: (status: boolean) => void,
};

export const PostsList: React.FC<Props> = ({
  selectedPost,
  selectedUser,
  onSelectPost,
  onAddComment,
  onError,
}) => {
  const { posts, setPosts } = usePosts();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => onError(true))
      .finally(() => setIsLoading(false));
  }, [selectedUser]);

  const handleSelectPost = (post: PostType) => {
    if (selectedPost && post.id === selectedPost.id) {
      onSelectPost(null);

      return;
    }

    onAddComment(false);
    onSelectPost(post);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div data-cy="PostsList">
          {posts.length ? (
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
                      <Post
                        post={post}
                        selectedPost={selectedPost}
                        onSelectPost={handleSelectPost}
                      />
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <div className="notification is-warning" data-cy="NoPostsYet">
              No posts yet
            </div>
          )}
        </div>
      )}
    </>
  );
};
