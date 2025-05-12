import { Post } from '../types/Post';

type Props = {
  userPosts: Post[];
  currentPost: Post | undefined; //fix undefined
  setIsSideBarShown: (shown: boolean) => void;
  setCurrentPost: (post: Post) => void;
  getCommentsByPostId: (postId: number) => void;
  setIsCommentFormShown: (formShown: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  currentPost,
  setIsSideBarShown,
  setCurrentPost,
  getCommentsByPostId,
  setIsCommentFormShown,
}) => {
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
          {userPosts?.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>
              {currentPost?.id !== post.id ? (
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => {
                      setIsSideBarShown(true);
                      setCurrentPost(post);
                      getCommentsByPostId(post.id);
                      setIsCommentFormShown(false);
                    }}
                  >
                    Open
                  </button>
                </td>
              ) : (
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => {
                      setIsSideBarShown(false);
                      setCurrentPost({ id: 0, title: '', body: '', userId: 0 });
                    }}
                  >
                    Close
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
