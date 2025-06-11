import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;

