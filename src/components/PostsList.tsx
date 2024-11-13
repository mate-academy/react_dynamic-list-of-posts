import React, { useState } from 'react';
import { Post } from '../types/Post';
import { PostDetails } from './PostDetails';
import classNames from 'classnames';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  posts: Post[];
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  const [open, setOpen] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpenPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setOpen(true);
      setSelectedPost(null);
    } else {
      setOpen(false);
      setSelectedPost(post);
      setLoading(true);

      getPostComments(post.id)
        .then(fetchedComments => setComments(fetchedComments))
        .catch(() => {
          setError('Something went wrong');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
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
            {posts.map(post => (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    //close - no is-light
                    className={classNames('button is-link', {
                      'is-light': selectedPost?.id !== post.id,
                    })}
                    onClick={() => handleOpenPost(post)}
                  >
                    {selectedPost?.id !== post.id ? 'Open' : 'Close'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!open && (
        <div
          data-cy="Sidebar"
          className={classNames(
            'tile',
            'is-parent',
            'is-8-desktop',
            'Sidebar',
            'Sidebar--open',
          )}
        >
          <div className="tile is-child box is-success ">
            <PostDetails
              selectedPost={selectedPost}
              comments={comments}
              setComments={setComments}
              loading={loading}
              isError={error}
            />
          </div>
        </div>
      )}
    </>
  );
};
