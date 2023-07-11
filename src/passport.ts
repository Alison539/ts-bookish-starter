//confirming have the correct dependencies
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const passport2 = require("passport");


passport2.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'super secret'
    },
    function (jwtPayload, cb) {
        console.log(jwtPayload.username)
        return cb(null, jwtPayload.username)
    }
));