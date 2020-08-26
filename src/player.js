const newPlayerInstance = (name, id) => {
  let score = 0;

  const incrementScore = () => {
    score += 1;
  };

  const resetPlayer = (newName) => {
    name = newName;
    score = 0;
  };

  const getScore = () => score;
  const getName = () => name;
  const getId = () => id;

  return {
    incrementScore,
    resetPlayer,
    getScore,
    getName,
    getId,
  };
};

export default newPlayerInstance;