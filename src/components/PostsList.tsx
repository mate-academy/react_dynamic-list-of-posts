import { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { getPosts } from '../api/fetchPosts';
import { Loader } from './Loader';
import classNames from 'classnames';

interface Props {
  selectedUserId: number | undefined;
  post: Post | null;
  setPost: (post: Post | null) => void;
}
export const PostsList: React.FC<Props> = ({
  selectedUserId,
  post,
  setPost,
}) => {
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const filteredPostsList = () => {
    return postsList.filter(p => p.userId === selectedUserId);
  };

  const isHasPostsList = filteredPostsList().length;

  useEffect(() => {
    if (selectedUserId !== undefined) {
      const fetchPosts = async () => {
        setIsLoading(true);
        try {
          const posts = await getPosts(selectedUserId);

          setPostsList(posts);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPosts();
    }
  }, [selectedUserId]);

  return (
    <>
      {!isLoading && isHasPostsList > 0 && (
        <div data-cy="PostsList">
          <p className="title">Posts:</p>

          <table
            className="table
          is-fullwidth is-striped is-hoverable is-narrow"
          >
            <thead>
              <tr className="has-background-link-light">
                <th>#</th>
                <th>Title</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {filteredPostsList().map(filteredPost => {
                return (
                  <tr key={filteredPost.id} data-cy="Post">
                    <td data-cy="PostId">{filteredPost.id}</td>

                    <td data-cy="PostTitle">{filteredPost.title}</td>

                    <td className="has-text-right is-vcentered">
                      <button
                        type="button"
                        data-cy="PostButton"
                        className={classNames('button is-link', {
                          'is-light': post?.id !== filteredPost.id,
                        })}
                        onClick={() => {
                          if (post && post === filteredPost) {
                            setPost(null);
                          } else {
                            setPost(filteredPost);
                          }
                        }}
                      >
                        {post?.id !== filteredPost.id ? 'Open' : 'Close'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {isLoading && <Loader />}

      {isError && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      )}

      {!isHasPostsList && selectedUserId && !isError && !isLoading && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}
    </>
  );
};
