import Post from './post';

export default interface User {
  id: number;
  email: string;
  nickname: string;
  password: string;
  img?: string;
  Followings: User[];
  Followers: User[];
  Posts?: Post[];
}
