import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createComment,
  deletePostComment,
  getPostComments,
  getPostDetails,
} from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { PostComment } from '../PostComment/PostComment';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

type PostDetail = {
  details: Post;
  comments: PostComment[];
};

export const PostDetails: React.FC<Props> = ({
  selectedPostId,
}) => {
  const [postDetails, setPostDetails] = useState<PostDetail | null>(null);
  const [isCommentsVisible, setIsCommentVisible] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  const getDetailsFromServer = useCallback(async () => {
    const [details, comments] = await Promise.all([
      getPostDetails(selectedPostId),
      getPostComments(selectedPostId),
    ]);

    await setPostDetails({ details, comments });
    setCommentLoading(false);
  }, [selectedPostId]);

  useEffect(() => {
    setPostDetails(null);
    getDetailsFromServer();
  }, [selectedPostId]);

  const handleCommentVisible = useCallback(() => {
    setIsCommentVisible(prev => !prev);
  }, []);

  const handleAddComment = useCallback(async (newComment: NewComment) => {
    setCommentLoading(true);
    await createComment(newComment);
    getDetailsFromServer();
  }, [postDetails]);

  const handleDeleteComment = useCallback(async (deleteId: number) => {
    setCommentLoading(true);
    await deletePostComment(deleteId);
    getDetailsFromServer();
  }, [postDetails]);

  const commentsLength = useMemo(() => {
    return postDetails ? postDetails.comments.length : 0;
  }, [postDetails]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {postDetails ? (
        <>
          <section className="PostDetails__post">
            <p>{postDetails.details.body}</p>
          </section>

          {(commentsLength > 0) && (
            <section
              data-cy="postDetails"
              className="PostDetails__comments"
            >
              <button
                onClick={handleCommentVisible}
                type="button"
                className="button"
              >
                {`${isCommentsVisible ? 'Hide' : 'Show'} ${commentsLength} comment${commentsLength > 1 ? 's' : ''}`}
              </button>

              {isCommentsVisible && (
                <ul className="PostDetails__list">
                  {postDetails.comments.map(comment => (
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
