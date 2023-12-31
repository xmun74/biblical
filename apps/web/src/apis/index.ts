import { axiosInstance } from '@/config/axiosConfig';

/** AUTH */
export const loginAPI = async (loginData: { email: string; password: string }) => {
  const { data } = await axiosInstance.post(`/auth/login`, loginData);
  return data;
};

export const logoutAPI = async (): Promise<{ message: string }> => {
  const { data } = await axiosInstance.get(`/auth/logout`);
  return data;
};

/** USER */
export const getMeAPI = async () => {
  const { data } = await axiosInstance.get(`/users`);
  return data;
};
export const patchNicknameAPI = async (nickname: string) => {
  const { data } = await axiosInstance.patch(`/users/nickname`, { nickname });
  return data;
};
export const uploadUserImgAPI = async (imgData: FormData) => {
  const { data } = await axiosInstance.post(`/users/image`, imgData, {
    headers: { 'Content-Type': 'multipart/form-data; charset=UTF-8' },
  });
  return data;
};
export const deleteUserAPI = async () => {
  const res = await axiosInstance.delete(`/users`);
  return res;
};
export const getUserAPI = async (userId: number) => {
  const { data } = await axiosInstance.get(`/users/${userId}`);
  return data;
};
export const postFollowAPI = async (userId: number) => {
  const { data } = await axiosInstance.post(`/users/${userId}/follow`);
  return data;
};
export const deleteUnFollowAPI = async (userId: number) => {
  const { data } = await axiosInstance.delete(`/users/${userId}/follow`);
  return data;
};

/** MEETING */
export const postMeetingAPI = async (meetData: MeetFormProps) => {
  const { data } = await axiosInstance.post(`/meetings`, meetData);
  return data;
};
export const getMeetingAPI = async (meetId: number) => {
  const { data } = await axiosInstance.get(`/meetings/${meetId}`);
  return data;
};
export const deleteMeetingAPI = async (meetId: number) => {
  const { data } = await axiosInstance.delete(`/meetings/${meetId}`);
  return data;
};
export const deleteWithdrawAPI = async (meetId: number) => {
  const { data } = await axiosInstance.delete(`/meetings/${meetId}/withdraw`);
  return data;
};
export const getMeetingsAPI = async () => {
  const { data } = await axiosInstance.get(`/meetings`);
  return data;
};
export const postMeetingInviteLinkAPI = async (meetId: number) => {
  const { data } = await axiosInstance.post(`/meetings/${meetId}/invite`);
  return data;
};
export const postMeetingInviteAPI = async (meetId: number, inviteLink: string) => {
  const { data } = await axiosInstance.post(`/meetings/${meetId}/invite/${inviteLink}`);
  return data;
};
export const getMeetingInviteInfoAPI = async (meetId: number, inviteLink: string) => {
  const { data } = await axiosInstance.get(`/meetings/${meetId}/invite/${inviteLink}`);
  return data;
};
export const getMeetingMembersAPI = async (meetId: number) => {
  const { data } = await axiosInstance.get(`/meetings/${meetId}/members`);
  return data;
};

/** POST */
export const uploadPostAPI = async (post: PostFormProps) => {
  const { data } = await axiosInstance.post(`/post`, post);
  return data;
};
export const getPostsAPI = async (meetId: number) => {
  const {
    data: { posts },
  } = await axiosInstance.get(`/posts/?meetId=${meetId}`);
  return posts;
};
export const getPostAPI = async (postId: number) => {
  const { data } = await axiosInstance.get(`/post/${postId}`);
  return data;
};
export const patchPostAPI = async (postId: number, post: PostFormProps) => {
  const { data } = await axiosInstance.patch(`/post/${postId}`, post);
  return data;
};
export const deletePostAPI = async (postId: number, meetId: number) => {
  const { data } = await axiosInstance.delete(`/post/${postId}/?meetId=${meetId}`);
  return data;
};

/** BIBLE */
export const getBibleAPI = async (book: number, chapter: number) => {
  const {
    data: { data },
  } = await axiosInstance.get(`/bible?book=${book}&chapter=${chapter}`);
  return data;
};
export const getBibleTotalCntAPI = async () => {
  const {
    data: { chapterCount },
  } = await axiosInstance.get(`/bible/count/chapter`);
  return chapterCount;
};
export const getVerseTotalCntAPI = async (book: number, chapter: number) => {
  const { data } = await axiosInstance.get(`/bible/count/verse?book=${book}&chapter=${chapter}`);
  return data;
};
