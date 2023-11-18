/* const CustomApiError = require("../errors/customError");

const errorHamdlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    res.status(err.statusCode).json({ msg: err.message });
  } 

  return res.status(500).json({ msg: "Something went wrong" });

  // return res.status(500).json({ msg: err });
  // return res.status(500).json({ msg: "something went wrong" });
  // return res.status(err.stausCode).json({ msg: err.message });
};

module.exports = errorHamdlerMiddleware;
 */

const CustomApiError = require("../errors/customError");

const errorHamdlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    res.status(err.statusCode).json({ msg: err.message });
  } else {
    // Fix the typo here: it should be `status` not `staus`
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = errorHamdlerMiddleware;
