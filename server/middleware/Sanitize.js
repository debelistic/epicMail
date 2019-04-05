require('@babel/polyfill');

const Sanitize = {
  /**
   * This is taken from discussion at:
   * https://stackoverflow.com/questions/30266295/using-express-can-i-automatically-trim-all-incoming-posted-fields-in-req-body
   * @param {request object} req
   * @param {response object} res
   * @param {next middleware} next
   */
  async trimInput(req, res, next) {
    try {
      if (req.method === 'POST') {
      // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(req.body)) {
          req.body[key] = value.trim();
        }
      }
      return next();
    } catch (error) {
      return next(error);
    }
  },
};


export default Sanitize;
