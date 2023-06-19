/* eslint-disable import/prefer-default-export */
import { get } from '.';

async function getUsers(pageNo) {
  const response = await get(`api/users?page=${pageNo}`);
  return response;
}

export const UserService = {
  getUsers,
};
