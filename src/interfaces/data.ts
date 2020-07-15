export interface Post {
  readonly userId: number;
  readonly id: number;
  readonly title: string;
  readonly body: string;
}

interface UserAddress {
  readonly street: string;
  readonly suite: string;
  readonly city: string;
}

export interface User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly address: UserAddress;
}

export interface Comment {
  readonly postId: number;
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly body: string;
}

export interface PostExtended {
  readonly id: number;
  readonly title: string;
  readonly body: string;
  readonly author: User;
  readonly comments: Comment[];
}
