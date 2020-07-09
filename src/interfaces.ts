export type commentsType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type postsType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type usersType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type preparedPostsType = {
  author: string;
  email: string;
  address: string;
  comments: commentsType[];
  userId: number;
  id: number;
  title: string;
  body: string;
};
