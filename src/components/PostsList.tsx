import React, { useCallback, useContext } from 'react';
import cn from 'classnames';
import { AppContext } from '../AppContext';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const {
    posts,
    selectedPost,
    setSelectedPost,
  } = useContext(AppContext);

  const handlePostOpen = useCallback((post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    }

    setSelectedPost(post);
  }, [selectedPost, setSelectedPost]);

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
          {posts.map(post => {
            const isSelected = selectedPost?.id !== post.id;

            return (
              <tr data-cy="Post">
                <td data-cy="PostId">
                  {post.id}
                </td>

                <td data-cy="PostTitle">
                  {post.title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': isSelected,
                    })}
                    onClick={() => handlePostOpen(post)}
                  >
                    {isSelected ? 'Open' : 'Close'}
                  </button>
                </td>
              </tr>
            );
          })}

          {/* <tr data-cy="Post">
            <td data-cy="PostId">17</td>

            <td data-cy="PostTitle">
              fugit voluptas sed molestias voluptatem provident
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link is-light"
              >
                Open
              </button>
            </td>
          </tr>

          <tr data-cy="Post">
            <td data-cy="PostId">18</td>

            <td data-cy="PostTitle">
              voluptate et itaque vero tempora molestiae
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link"
              >
                Close
              </button>
            </td>
          </tr>

          <tr data-cy="Post">
            <td data-cy="PostId">19</td>
            <td data-cy="PostTitle">adipisci placeat illum aut reiciendis qui</td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link is-light"
              >
                Open
              </button>
            </td>
          </tr>

          <tr data-cy="Post">
            <td data-cy="PostId">20</td>
            <td data-cy="PostTitle">doloribus ad provident suscipit at</td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link is-light"
              >
                Open
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};
