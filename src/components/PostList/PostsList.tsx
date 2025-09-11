/* eslint-disable @typescript-eslint/indent */
import { Post } from '../../types/interfaces';
import { PostListItem } from './PostListItem';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenCommentForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
  setIsOpenSidebar,
  setIsOpenCommentForm,
}) => {
  const toggleSidebar = (postId: number) => {
    setIsOpenCommentForm(false);

    if (selectedPost?.id === postId) {
      setIsOpenSidebar(false);
      setSelectedPost(null);
    } else {
      setIsOpenSidebar(true);
      const newPost = posts.find(post => post.id === postId) || null;

      setSelectedPost(newPost);
    }
  };

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
            return (
              <PostListItem
                key={post.id}
                post={post}
                toggleSidebar={toggleSidebar}
                selectedPost={selectedPost}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
