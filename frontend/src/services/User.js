import axios from "axios";

export const getUsers = async () => {
  try {
    const result = await axios({
      method: "POST",
      url: "/users/list",
    });

    return result.data;
  } catch (err) {
    console.log("Error getUsers: ", err);
    return [];
  }
};

export const deleteUser = async (deleteId) => {
  try {
    const result = await axios({
      method: "DELETE",
      url: `/users`,
      params: {
        deleteId,
      },
    });

    return result.data;
  } catch (err) {
    console.log("Error deleteUser: ", err);
    return false;
  }
};

export const createUser = async (payload) => {
  try {
    const result = await axios({
      method: "POST",
      url: `/users`,
      data: payload,
    });

    return result.data;
  } catch (err) {
    console.log("Error createUser: ", err);
    return false;
  }
};

export const updateUser = async (payload) => {
  try {
    const result = await axios({
      method: "PUT",
      url: `/users`,
      data: payload,
    });

    return result.data;
  } catch (err) {
    console.log("Error updateUser: ", err);
    return false;
  }
};
