const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { saltHashPassword, randomString } = require('../helpers/store')
const Users = require('../models/users')
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JWTStrategy(opts,
    function (jwtPayload, cb) {
          console.log(jwtPayload);
        //find the user in db if needed
        return Users.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));


passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  (username,password,callback) => {
    return Users
      .query()
      .where({ username })
      .then(([user]) => {
        if (!user) {
          return callback(null, false, {message: 'Incorrect Username.'})
        }
        else {
          const { hash } = saltHashPassword({
            password,
            salt: user.salt_bae
          })
          if ( hash === user.password_hash) {
            return callback(null, user, {message: 'Logged In Successfully'});
          }
          else {
            return callback(null, false, {message: 'Incorrect Username.'})
          }
        }
      })
      .catch(err => callback(err))
}))
