import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const bearer = req.headers.authorization;
  const token = req.headers.token || (bearer?.startsWith("Bearer ") ? bearer.slice(7) : null);

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecode.id) {
      return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    req.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;