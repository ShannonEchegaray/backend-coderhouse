import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  ExtractJwt as ExtractJWT,
  Strategy as JWTStrategy,
} from "passport-jwt";
import UserDao from "../model/DAO/user.mongo.js";
import CartDao from "../model/DAO/cart.mongo.js";
import { compare, encrypt } from "../utils/bcrypt.js";
import { secretToken } from "../config/config.js";

const UserDAO = UserDao.getInstance();
const CartDAO = CartDao.getInstance();

passport.use(
  "register",
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const user = await UserDAO.getAll({ email });
        console.log("Hola mundo", user);
        if (user.length === 1) {
          console.log("El usuario ya existe");
          return done(null, false, { message: "El usuario ya existe" });
        }

        req.body.password = await encrypt(req.body.password);

        const userCreated = await UserDAO.create(req.body);
        const cartCreated = await CartDAO.create({ user: userCreated.id });
        await UserDAO.updateById(userCreated.id, { cart: cartCreated.id });

        return done(null, userCreated);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await UserDAO.getAll({ email });
        if (user.length === 0) {
          return done(null, false, { message: "El usuario no existe" });
        }

        if (
          !user[0].email === email &&
          !(await compare(password, user[0].password))
        ) {
          return done(null, false, {
            message: "La contraseña o email no coinciden",
          });
        }

        console.log("El usuario se logueo con exito");

        return done(null, user[0]);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: secretToken,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
