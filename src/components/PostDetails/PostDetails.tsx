import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Post } from '../../types/Post';
import {
  deletePostComment,
  getPostComments,
  getPostDetails,
} from '../../api/api';
import { Comment } from '../../types/Comment';
import { Loader } from '../Loader';

type Props = {
  postId: number | null;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>();
  const [visibleComment, setVisibleComment] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const retrievePostDetails = async () => {
      const postDetail = await getPostDetails(postId);
      const postComments = await getPostComments(postId);

      setPost(postDetail);
      setComments(postComments);
      setLoading(false);
    };

    retrievePostDetails();
  }, [post]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setVisibleComment(prevState => !prevState)}
        >
          {`${visibleComment ? 'Hide' : 'Shown'} ${comments?.length} comments`}
        </button>

        {visibleComment && (
          <ul className="PostDetails__list">
            {comments?.map(comment => {
              return (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deletePostComment(comment.id);
                    }}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={post?.id} />
        </div>
      </section>
    </div>
  );
};
