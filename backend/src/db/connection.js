const { v4: uuid } = require("uuid");

const database = {
  users: [
    {
      id: uuid(),
      name: "bossROD",
      age: 24,
    },
  ],
};

module.exports = {
  getUsers: () => {
    return database.users;
  },
  createUser: (payload) => {
    const { name, age } = payload;
    database.users.push({ id: uuid(), name, age });
    return true;
  },
  updateUser: (payload) => {
    let index = -1;
    const { updateId, updateName, updateAge } = payload;

    database.users.forEach((user, key) => {
      if (user.id === updateId) {
        index = key;
      }
    });

    if (index !== -1) {
      const user = database.users[index];
      database.users[index] = { ...user, name: updateName, age: updateAge };
      return true;
    } else {
      return false;
    }
  },
  deleteUser: (deleteId) => {
    const isExists = database.users.find((user) => user.id === deleteId);

    if (isExists) {
      const filteredUsers = database.users.filter(
        (user) => user.id !== deleteId
      );
      database.users = filteredUsers;
      return true;
    } else {
      return false;
    }
  },
  // deleteUser: (deleteId) => {
  //   let index = -1;

  //   database.users.forEach((user, key) => {
  //     if (user.id === deleteId) {
  //       index = key;
  //     }
  //   });

  //   if (index !== -1) {
  //     database.users.splice(index, 1);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // },
};

// option 1
// module.exports = {
//   getUsers: () => {
//     return database.users;
//   },
//   createUser: () => {
//     console.log("createUser")
//   }
// };

// option 2
// module.exports.getUsers = () => {
//   return database.users;
// };
// module.exports.createUser = () => {
//   console.log("createUser");
// };

// option 3
// const getUsers = () => {
//   return database.users;
// };

// const createUser = () => {
//   console.log("createUser");
// };

// module.exports = { getUsers, createUser };
