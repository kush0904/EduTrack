let userId = 0;
const setUserId = (newUserId) => {
  userId = newUserId;
};

const getUserId = () => {
  return userId;
};

module.exports = { setUserId, getUserId };
