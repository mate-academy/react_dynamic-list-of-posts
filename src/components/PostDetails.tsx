import { FC, useEffect, useState } from 'react';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentsList } from './CommentsList';

import { deleteComment, getComments } from '../api/comments';

interface Props {
  selectedPost: Post;
}

export const PostDetails: FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [error, setError] = useState('');
  const [isShownForm, setIsShownForm] = useState(false);

  const handleDeleteComment = (id: Comment['id']) => {
    deleteComment(id)
      .then(() =>
        setComments(currentComments =>
          currentComments.filter(comment => comment.id !== id),
        ),
      )
      .catch(() => 'Unable to delete post');
  };

  useEffect(() => {
    setIsShownForm(false);
    setError('');
    setIsLoadingComments(true);

    getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setIsLoadingComments(false);
      });
  }, [selectedPost.id, setError]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {comments.length === 0 && !isLoadingComments && !error && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && !isLoadingComments && !error && (
            <CommentsList
              comments={comments}
              onDeleteComment={handleDeleteComment}
            />
          )}

          {!isShownForm && !isLoadingComments && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsShownForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {!!isShownForm && (
          <NewCommentForm
            selectedPost={selectedPost}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
