let userId = 0;

const setUserId = (newUserId) => {
  userId = newUserId;
};

const getUserId = () => {
  return userId;
};

export default userId;
export { setUserId, getUserId };
