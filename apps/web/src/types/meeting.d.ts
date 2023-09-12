type MeetingUserType = {
  MeetingId: number;
  UserId: number;
  createdAt: string;
  updatedAt: string;
};

type Meetings = {
  MeetingUser: MeetingUserType;
  name: string;
};

type Member = {
  MeetingUser: MeetingUserType;
  id: number;
  img: string | null;
  nickname: string;
};

type MeetFormProps = {
  name: string;
  introduce: string;
};

type MeetModalProps = {
  onSubmit?: () => void;
  onClose?: () => void;
};
