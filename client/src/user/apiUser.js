import axios from "axios";

export const getUser = function (userId, token) {
  return axios.get(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const list = function (token) {
  return axios.get("/user/");
};
