import jwt from "jsonwebtoken";
import passport from "passport";
import loginService from "../service/login.service.js";

class LoginController {
  async login(req, res, next) {
    passport.authenticate(
      "login",
      { session: false },
      async (err, user, info) => {
        try {
          console.log(user);

          if (err || !user) {
            const error = new Error("An error occurred.");

            return next(error);
          }

          req.login(user, { session: false }, (error) => {
            console.log(error);
            const body = { id: user.id, email: user.email };
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

  async isAdmin(req, res, next) {
    try {
      const admin = await loginService.isAdmin(req.user);
      if (!admin) throw new Error("El usuario no es administrador");
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default new LoginController();
