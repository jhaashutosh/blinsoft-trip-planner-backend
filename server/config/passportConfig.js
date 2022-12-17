const User = require("../database/model/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

exports.initializingPassport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false); // if user is not found.
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) console.log(err);
          if (!res) {
            return done(null, false); //if user is found but the password is not matched.
          } else {
            return done(null, user); //if user is found and we don't get any errors then finally send the user details.
          }
        });
      } catch (err) {
        return done(err, false); //if any error is encountered.
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });
};

exports.isAuthenticated = (req, res, next) => {
  if (req.user) return next();

  res.redirect("/login");
};
