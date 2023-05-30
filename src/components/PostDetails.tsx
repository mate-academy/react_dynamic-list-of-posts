import { useEffect, useState } from 'react';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useItems } from '../hooks/useItems';
import { Comment } from '../types/Comment';
import { CommentsList } from './CommentsList';

type PostDetailsProps = {
  selectedPost: Post | null;
};

export const PostDetails = ({ selectedPost }: PostDetailsProps) => {
  const [formOpen, setFormOpen] = useState(false);
  const {
    handleItemsFetch,
    handleItemPost,
    handleItemDelete,
    loading,
    errorMsg,
    items: comments,
  } = useItems<Comment>();

  useEffect(() => {
    setFormOpen(false);

    if (selectedPost) {
      handleItemsFetch(
        '/comments?postId=',
        selectedPost.id,
        'Unable to fetch comments',
      );
    }
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {errorMsg && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMsg}
            </div>
          )}

          {comments
            && (comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <CommentsList
                comments={comments}
                handleDeleteComment={handleItemDelete}
              />
            ))}

          {!formOpen && !loading && !errorMsg && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setFormOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {formOpen && (
          <NewCommentForm
            postId={selectedPost?.id}
            handleAddComment={handleItemPost}
          />
        )}
      </div>
    </div>
  );
};
