import { MeetProps } from '@/components/Modal/MeetingCreateModal';
import { axiosInstance } from '@/config/axiosConfig';

export interface LoginResponse {
  message: string;
  userInfo?: {
    userId: number;
    nickname: string;
    email: string;
  };
}

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
export const patchUserImgAPI = async (imgData: FormData) => {
  const { data } = await axiosInstance.patch(`/users/image`, imgData, {
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
export const postMeetingAPI = async (meetData: MeetProps) => {
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
