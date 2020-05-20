import axios from "axios";

export const getUser = function (userId, token) {
  return axios.get(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const list = function () {
  return axios.get("/user/");
};

export const remove = function (userId, token) {
  return axios.delete(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = function (userId, token, user) {
  console.log(userId);
  console.log("token", token);
  return axios.put(`/user/${userId}`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
