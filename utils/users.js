const users = [];
var db = require('../db');


// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };
  db.query('INSERT INTO userInfo(username, roomID) VALUES (?, ?)', [username, room], (err, result) => {
    err ? console.log(err) : console.log(result);
  })
  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
