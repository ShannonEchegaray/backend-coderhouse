import jwt from "jsonwebtoken";
import passport from "passport";

class LoginController {
  async login(req, res, next) {
    passport.authenticate(
      "login",
      { session: false },
      async (err, user, info) => {
        try {
          console.log(info);

          if (err || !user) {
            const error = new Error("An error occurred.");

            return next(error);
          }

          req.login(user, { session: false }, (error) => {
            console.log(error);
            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, "TOP_SECRET");

            console.log(body);
            console.log(token);

            return res.json({ token });
          });
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
}

export default new LoginController();
