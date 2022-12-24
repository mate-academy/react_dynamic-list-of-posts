import React from 'react';
import { Post } from '../types/Post';
import { Notification } from './Notification';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[],
  setSelectedPost: (post: Post | null) => void,
  selectedPostId: number | undefined,
};

export const PostsList: React.FC<Props> = ({
  posts,
  setSelectedPost,
  selectedPostId,
}) => {
  return (
    <>
      {posts.length !== 0
        ? (
          <div data-cy="PostsList">
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
                {posts.map(post => (
                  <PostItem
                    key={post.id}
                    post={post}
                    setSelectedPost={setSelectedPost}
                    selectedPostId={selectedPostId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Notification
            error={{
              message: 'No posts yet!',
              type: 'NoPostsYet',
              isWarning: true,
            }}
          />
        )}
    </>
  );
};
