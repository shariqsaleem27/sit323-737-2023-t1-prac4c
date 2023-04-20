// auth.js
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const users = require('./users');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret' 
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  const user = users.find(u => u.id === jwtPayload.id);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
}));

const authenticate = (req, res, next) => {
    
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    console.log(user)
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

const generateToken = (user) => {
  const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey);
  return token;
};

module.exports = { authenticate, generateToken };
