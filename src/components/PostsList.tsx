import React, { useCallback } from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
}) => {
  const handlePostInfo = useCallback(
    (id: number) => {
      if (selectedPost?.id === id) {
        setSelectedPost(null);
      } else {
        setSelectedPost(posts.find(post => post.id === id) || null);
      }
    },
    [posts, selectedPost?.id, setSelectedPost],
  );

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
          {posts.map(post => {
            const { id, title } = post;

            return (
              <PostItem
                key={id}
                id={id}
                title={title}
                selectedPostId={selectedPost?.id}
                handlePostInfo={handlePostInfo}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
