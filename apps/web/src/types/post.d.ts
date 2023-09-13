type PostFormProps = {
  title: string;
  content: string;
  meetId?: string;
  img?: string;
  tags?: string[];
};

type Post = {
  id: number;
  title: string;
  content: string;
  views: null | number;
  tags: null | string;
  img: null | string;
  createdAt: string;
  MeetingId: number;
  userId: number;
  User: {
    id: number;
    nickname: string;
    img: null | string;
  };
};
