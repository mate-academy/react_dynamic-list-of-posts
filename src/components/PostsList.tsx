import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Post } from '../types/Post';
import { getPosts } from '../utils/fetchClient';
import { Loader } from './Loader';

type Props = {
  userSelectedId: number;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
  postSelectedId: number;
  setPostSelectedId: Dispatch<SetStateAction<number>>;
  setSelectedPost: Dispatch<SetStateAction<Post | undefined>>;
};

export const PostsList: React.FC<Props> = ({
  userSelectedId,
  setShowSideBar,
  postSelectedId,
  setPostSelectedId,
  setSelectedPost,
}) => {
  const [posts, setPosts] = useState<Post[] | null>();
  const [isLoader, setIsLoader] = useState(false);
  const [isErrorPosts, setIsErrorPosts] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    getPosts(userSelectedId)
      .then(postsFromServer => {
        if (!Array.isArray(postsFromServer)) {
          throw new Error('load error');
        }

        setIsLoader(false);
        setPosts(postsFromServer);
        setIsErrorPosts(false);
      })
      .catch(() => {
        setPosts([]);
        setIsErrorPosts(true);
        setIsLoader(false);
      });

    setShowSideBar(false);
    setIsErrorPosts(false);
  }, [userSelectedId]);

  return (
    <>
      {isErrorPosts && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      )}

      {isLoader ? <Loader /> : (
        <div data-cy="PostsList">
          {!isErrorPosts && (
            <>
              {posts?.length === 0 && (
                <div className="notification is-warning" data-cy="NoPostsYet">
                  No posts yet
                </div>
              )}
            </>
          )}
          {posts?.length !== 0 && (
            <>
              <p className="title">Posts:</p>
              <table
                className="table is-fullwidth is-striped is-hoverable is-narrow"
              >
                <thead>
                  <tr className="has-background-link-light">
                    <th>#</th>
                    <th>Title</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>

                <tbody>

                  {posts?.map(post => (
                    <tr key={post.id} data-cy="Post">
                      <td data-cy="PostId">{post.id}</td>
                      <td data-cy="PostTitle">
                        {post.title}
                      </td>
                      <td className="has-text-right is-vcentered">
                        {postSelectedId === post.id ? (
                          <button
                            type="button"
                            data-cy="PostButton"
                            className="button is-link"
                            onClick={() => {
                              setShowSideBar(false);
                              setPostSelectedId(0);
                            }}
                          >
                            Close
                          </button>
                        ) : (
                          <button
                            type="button"
                            data-cy="PostButton"
                            className="button is-link is-light"
                            onClick={() => {
                              setShowSideBar(true);
                              setPostSelectedId(post.id);
                              setSelectedPost(post);
                            }}
                          >
                            Open
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </>
  );
};
