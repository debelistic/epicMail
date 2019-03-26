const Sanitize = {
  async trimInput(userInput) {
    try {
      return userInput.trim();
    } catch (error) {
      return error;
    }
  },

  async lowerCaseInput(userInput) {
    try {
      return userInput.toLowerCase();
    } catch (error) {
      return error;
    }
  },

  async trimAndLowerCase(userInput) {
    try {
      return userInput.trim().toLowerCase();
    } catch (error) {
      return error;
    }
  },
};

export default Sanitize;
