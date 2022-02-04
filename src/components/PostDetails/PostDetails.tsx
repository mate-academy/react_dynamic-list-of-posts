import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  getPostComments,
  Comment,
  createComment,
  deleteComment,
} from '../../api/comments';
import { getPostDetails } from '../../api/post';
import { NewCommentForm, NewComment } from '../NewCommentForm';
import { Post } from '../PostsList';
import { Loader } from '../Loader';
import './PostDetails.scss';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post>();

  const [showComments, setShowComments] = useState(true);
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [idDeletedComment, setIdDeletedComment] = useState(0);
  const [newComment, setNewComment] = useState<NewComment>();

  useEffect(() => {
    getPostDetails(postId)
      .then(receivedPost => {
        setPost(receivedPost);
        setLoadingPost(true);
      });
  }, [postId]);

  const getComments = useCallback(() => {
    getPostComments(postId)
      .then(receivedComments => {
        setComments(receivedComments);
        setLoadingComments(true);
      });
  }, []);

  useEffect(getComments, [postId, idDeletedComment, newComment]);

  useMemo(async () => {
    if (idDeletedComment) {
      await deleteComment(idDeletedComment);
    }

    getComments();
  }, [idDeletedComment]);

  useMemo(async () => {
    if (newComment) {
      await createComment({
        ...newComment,
        id: comments.length,
        postId,
        createdAt: '',
        updatedAt: '',
      });
    }

    getComments();
  }, [newComment]);

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
                  setShowComments(currentValue => !currentValue);
                }}
              >
                {showComments ? 'Hide' : 'Show'}
                {` ${comments.length} comments`}
              </button>
            )}

            {loadingComments && comments ? (
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
                        onClick={() => {
                          setIdDeletedComment(currentComment.id);
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
                setNewComment={setNewComment}
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
