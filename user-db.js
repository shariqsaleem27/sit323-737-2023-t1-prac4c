const users = [
    { id: 1, username: 'john', password: 'password1' },
    { id: 2, username: 'jane', password: 'password2' },
  ];
  
  function getUserFromDatabase(userId) {
    return users.find((user) => user.id === userId);
  }
  
  module.exports = {
    getUserFromDatabase,
  };
  