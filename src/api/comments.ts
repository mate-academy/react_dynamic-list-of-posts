import { request, BASE_URL } from './posts';

export const getPostComments = (postId: string) => request(
  `/comments?postId=${postId}`,
);

const post = (url: string, data: any) => {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};

export const createComment = (newComment : NewComment) => {
  // eslint-disable-next-line no-console
  console.log(`${BASE_URL}/comments`, 'POST', newComment);

  return post('/comments', newComment);
};

// export const createComment = (newComment : NewComment) => {
//   // eslint-disable-next-line no-console
//   console.log(`${BASE_URL}/comments`, 'POST', newComment);

//   // return fetch(`${BASE_URL}/comments`, {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-type': 'application/json; charset=UTF-8',
//   //   },
//   //   body: JSON.stringify(newComment),
//   // })
//   //   .then(response => response.json());

//   return post()
// };
