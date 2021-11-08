import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostsDetails } from '../../api/posts';
import Post from '../../types/postType';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import Comment from '../../types/commentType';

type PostDetailsProps = {
  postID: number,
};

export const PostDetails: React.FC<PostDetailsProps> = (props: PostDetailsProps) => {
  const { postID } = props;
  const [postToDisplay, setPost] = useState<Post>();
  const [currentComments, setComments] = useState<Comment[]>([]);
  const [isVisibleComment, setCommentVisibility] = useState(true);
  const [isVisiblePost, setPostVisibility] = useState(false);
  const addNewComment = (name: string, email: string, body: string) => {
    const newComment: Comment = {
      id: currentComments.length,
      postId: postID,
      name,
      email,
      body,
      createdAt: String(new Date()),
      updatedAt: String(new Date()),
    };

    addComment(newComment);

    const newComArr = [...currentComments, newComment];

    setComments(newComArr);
  };

  useEffect(() => {
    if (postID !== 0) {
      getPostsDetails(postID)
        .then(post => setPost(post));
      setCommentVisibility(true);
      setPostVisibility(true);
      getPostComments(postID)
        .then(res => setComments(res));
    } else {
      setCommentVisibility(false);
      setPostVisibility(false);
    }
  }, [postID]);

  return postToDisplay && isVisiblePost
    ? (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{isVisiblePost && postToDisplay?.body}</p>
        </section>
        <section
          className="PostDetails__comments"
          hidden={currentComments.length < 1}
        >
          <button
            type="button"
            className="button"
            onClick={() => setCommentVisibility(!isVisibleComment)}
          >
            {isVisibleComment
              ? 'Hide'
              : 'Show'}
            {' '}
            {currentComments.length}
            {' '}
            comments
          </button>

          <ul className="PostDetails__list">
            {
              isVisibleComment && currentComments.map(el => {
                return (
                  <li
                    className="PostDetails__list-item"
                    key={el.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => {
                        const newAr = currentComments.filter(com => com.id !== el.id);

                        setComments(newAr);
                        deleteComment(el.id);
                      }}
                    >
                      X
                    </button>
                    <p>{el.body}</p>
                  </li>
                );
              })
            }
          </ul>
        </section>

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm addCommentFunc={addNewComment} />
          </div>
        </section>
      </div>
    )
    : (
      <div className="PostDetails">
        <h2>Post details:</h2>
      </div>
    );
};
