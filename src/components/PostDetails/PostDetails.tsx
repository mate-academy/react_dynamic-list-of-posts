import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { getPostDetails } from '../../api/posts';
import {
  createComment,
  deletePostComment,
  getPostComments,
} from '../../api/comments';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { PostComment } from '../PostComment/PostComment';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({
  selectedPostId,
}) => {
  const [details, setDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isCommentsVisible, setIsCommentVisible] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  const getDetailsFromServer = useCallback(async () => {
    const [detailsFromServer, commentsFromServer] = await Promise.all([
      getPostDetails(selectedPostId),
      getPostComments(selectedPostId),
    ]);

    await setDetails(detailsFromServer);
    await setComments(commentsFromServer);
    setCommentLoading(false);
  }, [selectedPostId]);

  useEffect(() => {
    setDetails(null);
    setComments([]);
    getDetailsFromServer();
  }, [selectedPostId]);

  const handleCommentVisible = useCallback(() => {
    setIsCommentVisible(prev => !prev);
  }, []);

  const handleAddComment = useCallback(async (newComment: NewComment) => {
    setCommentLoading(true);
    const createdComment = await createComment(newComment);
    const newComments = await [...comments, createdComment];

    setComments(newComments);
    setCommentLoading(false);
  }, [comments]);

  const handleDeleteComment = useCallback(async (deleteId: number) => {
    setCommentLoading(true);
    await deletePostComment(deleteId);
    const filteredComments = [...comments].filter(
      comment => comment.id !== deleteId,
    );

    setComments(filteredComments);
    setCommentLoading(false);
  }, [comments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {details ? (
        <>
          <section className="PostDetails__post">
            <p>{details.body}</p>
          </section>

          {(comments.length > 0) && (
            <section
              data-cy="postDetails"
              className="PostDetails__comments"
            >
              <button
                onClick={handleCommentVisible}
                type="button"
                className="button"
              >
                {`${isCommentsVisible ? 'Hide' : 'Show'} ${comments.length} comment${comments.length > 1 ? 's' : ''}`}
              </button>

              {isCommentsVisible && (
                <ul className="PostDetails__list">
                  {comments.map(comment => (
                    <PostComment
                      key={comment.id}
                      comment={comment}
                      handleDeleteComment={handleDeleteComment}
                    />
                  ))}
                </ul>
              )}
            </section>
          )}

          {commentLoading && <Loader />}

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                selectedPostId={selectedPostId}
                handleAddComment={handleAddComment}
              />
            </div>
          </section>
        </>
      ) : <Loader />}
    </div>
  );
};
