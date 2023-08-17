interface Meetings {
  name: string;
  MeetingUser: {
    MeetingId: number;
    UserId: number;
    createdAt: string;
    updatedAt: string;
  };
}
