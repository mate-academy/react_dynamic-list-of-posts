import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useUserContext } from './Context/Context';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const {
    posts,
    setPosts,
    setErrorPosts,
    userSelected,
    setIsLoadingPosts,
    setPostSelected,
    postSelected,
  } = useUserContext();

  const postSelectionToggle = (post: Post) => {
    if (postSelected?.id === post.id) {
      setPostSelected(null);
    } else {
      setPostSelected(post);
    }
  };

  useEffect(() => {
    if (userSelected) {
      setIsLoadingPosts(true);
      setPosts([]);
      setPostSelected(null);
      client.get(`/posts?userId=${userSelected?.id}`)
        .then((response: unknown) => {
          setPosts(response as Post[]);
        })
        .catch(() => {
          setErrorPosts('Error loading posts');
        })
        .finally(() => {
          setIsLoadingPosts(false);
        });
    }
  }, [userSelected]);

  return (
    <>
      {(posts?.length !== 0 && userSelected) && (
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
              {posts?.map(post => (
                <tr data-cy="Post" key={post.id}>
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
                      className={classNames(
                        'button',
                        'is-link',
                        {
                          'is-light': post.id !== postSelected?.id,
                        },
                      )}
                      onClick={() => postSelectionToggle(post)}
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
