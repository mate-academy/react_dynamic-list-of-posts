import { FC, useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../Comments/NewCommentForm';
import { useCommentsContext } from '../../hooks/useCommentsContext';
import { usePostsContext } from '../../hooks/usePostsContext';
import { CommentList } from '../Comments/CommentList';
import { Notification } from '../Notification';
import { NotificationType } from '../../types';
import { useGlobalContext } from '../../hooks/useGlobalContext';

export const PostDetails: FC = () => {
  const { error } = useGlobalContext();
  const { selectedPost } = usePostsContext();
  const { isCommentsLoading } = useCommentsContext();

  const [writingNewPost, setWritingNewPost] = useState(false);

  useEffect(() => {
    setWritingNewPost(false);
  }, [selectedPost]);

  if (!selectedPost) {
    return (
      <Notification type={NotificationType.PostsError} />
    );
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        <div className="block">
          {isCommentsLoading ? (
            <Loader />
          ) : (
            <CommentList
              writingNewPost={writingNewPost}
              onWritingNewPost={setWritingNewPost}
            />
          )}
        </div>

        {writingNewPost && (
          <NewCommentForm />
        )}
      </div>

      {error && (
        <Notification type={NotificationType.CommentsError} />
      )}
    </div>
  );
};
