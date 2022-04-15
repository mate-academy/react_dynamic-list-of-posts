import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { getPostDetails } from '../../api/post';
import { NewCommentForm, NewComment } from '../NewCommentForm';
import { Post } from '../PostsList';
import { Loader } from '../Loader';
import './PostDetails.scss';

type Comment = {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
  createdAt: string,
  updatedAt: string,
};

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post>();

  const [showComments, setShowComments] = useState(true);
  const [loadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    getPostDetails(postId)
      .then(receivedPost => {
        setPost(receivedPost);
        setLoadingPost(true);
      });
  }, [postId]);

  const getComments = useCallback((id: number) => {
    getPostComments(id)
      .then(receivedComments => {
        setComments(receivedComments);
      });
  }, []);

  useEffect(() => {
    getComments(postId);
  }, [postId]);

  const createNewComment = async (newComment: NewComment) => {
    await createComment({
      ...newComment,
      postId,
    }, postId);

    getComments(postId);
  };

  return (
    <>
      {loadingPost && post ? (
        <div className="PostDetails">
          <h2>
            {`${post.title.toUpperCase()}:`}
          </h2>

          <section className="PostDetails__post">
            <p>
              {post.body}
            </p>
          </section>

          <section className="PostDetails__comments">
            {comments.length > 0 && (
              <button
                type="button"
                className="PostDetails__button button"
                onClick={() => {
                  setShowComments(!showComments);
                }}
              >
                {showComments ? 'Hide' : 'Show'}
                {` ${comments.length} comments`}
              </button>
            )}

            {comments ? (
              showComments && (
                <ul className="PostDetails__list">
                  {comments.map(currentComment => (
                    <li
                      className="PostDetails__list-item"
                      key={currentComment.id}
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={async () => {
                          await deleteComment(currentComment.id);

                          getComments(postId);
                        }}
                      >
                        X
                      </button>
                      <p>
                        {currentComment.body}
                      </p>
                    </li>
                  ))}
                </ul>
              )
            ) : (
              <Loader />
            )}
          </section>
          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                createNewComment={createNewComment}
              />
            </div>
          </section>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
