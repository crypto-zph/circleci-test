require('dotenv');
const passport          = require('passport');
const LocalStrategy     = require('passport-local').Strategy;
const GoogleStrategy    = require('passport-google-oauth20').Strategy;
const FacebookStrategy  = require('passport-facebook').Strategy;
const JWTstrategy       = require('passport-jwt').Strategy;
const ExtractJwt        = require('passport-jwt').ExtractJwt;
const MDB_USER          = require('../models/MDB_USER');
const MDB_ADMIN_USER    = require('../models/MDB_ADMIN_USER');
const User              = require('../models/MDB_USER').User;
const AdminUser         = require('../models/MDB_ADMIN_USER').AdminUser;

const mdb_user          = new MDB_USER();
const mdb_admin_user    = new MDB_ADMIN_USER();

/**
 * Called when user is added into the session
 *
 * It stores only the unique id of the user into the session
 */
passport.serializeUser((user, done) => {
    done(null, user.id);
});

/**
 * Called when needed the data of user
 *
 * It takes the id into the session then finds the user in the database
 * and returns it
 *
 * Can store whole user data into the session to avoid calling database for user
 */
passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// google login
// passport.use('google', new GoogleStrategy({
//     clientID            : process.env.GOOGLE_CLIENT_ID,
//     clientSecret        : process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL         : process.env.GOOGLE_CALLBACK_URL,
//     userProfileURL      : process.env.USER_PROFILE_URL,
//     passReqToCallback   : true
// }, async (req, accessToken, refreshToken, profile, cb) =>
// {
//     let user = await User.findOne({ googleId : profile.id });
//      if (!user) {
//         console.log('not found');
//         user = await User({
//             googleId    : profile.id,
//             first_name  : profile.name.givenName,
//             last_name   : profile.name.familyName,
//             email       : profile._json.email,
//             account_type: 'google'
//         }).save();
//     }

//     req.session.user_info = user;
//     return cb(null, user_info);
// }));

// facebook login
// passport.use('facebook', new FacebookStrategy({
//     clientID            : process.env.FACEBOOK_APP_ID,
//     clientSecret        : process.env.FACEBOOK_APP_SECRET,
//     callbackURL         : process.env.FACEBOOK_CALLBACK_URL,
//     passReqToCallback   : true
// }, async (req, accessToken, refreshToken, profile, cb) =>
// {
//     let user = User.findOne({ facecebookId : profile.id });

//     if (!user) {
//         user = await User({
//             facebookId  : profile.id,
//             first_name  : profile.name.givenName,
//             last_name   : profile.name.familyName,
//             email       : profile._json.email,
//             account_type: 'google'
//         }).save();
//     }

//     req.session.user_info = user;
//     return cb(null, req.session.user_info);
// }));

// client login
passport.use('client-login', new LocalStrategy({
    usernameField: 'userOrEmail',
    passwordField: 'password',
    passReqToCallback : true
}, async (req, userOrEmail, password, done) =>
{
    await User.findOne({ $or : [{ 'email' : userOrEmail }, { 'username' : userOrEmail }] }).populate('wallet')
        .then(user => {
            if (!user) {
                return done(null, false, { message: `User with email address ${userOrEmail} doesn't exist` });
            } else {
                let authenticate = User.authenticate();
                authenticate(user.username, password, function (err, userdata) {
                    if (err) {
                        // console.log(err);
                    } else if (!userdata) {
                        return done(null, false, { message: 'Invalid password' });
                    } else {
                        userdata.wallet = user.wallet;
                        req.session.user_info = userdata;
                        return done(null, req.session.user_info);
                    }
                });
            }
        }).catch(done);
}));


// admin login
passport.use('admin-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) =>
{
    await AdminUser.findOne({ email })
            .then(user =>
            {
                if (!user) {
                    return done(null, false, { message: `User with email address ${email} doesn't exist` });
                } else if (user && !mdb_admin_user.validatePassword(password, user.password)) {
                    return done(null, false, { message: 'Invalid password' });
                }
                
                req.session.admin_user = user;
                return done(null, req.session.admin_user);
            }).catch(done);
}));

const opts =
{
    jwtFromRequest  : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey     : process.env.PASSPORT_SECRET_KEY
}

passport.use(
    'jwt-client',
    new JWTstrategy(opts, (payload, done) =>
    {
        User.find({ email : payload.email }, (err, user) =>
        {
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, {
                    email   : user.email,
                    _id     : user._id
                });
            }

            return done(null, false);
        });
    })
);

passport.use(
    'jwt-admin',
    new JWTstrategy(opts, (payload, done) =>
    {
        AdminUser.find({ email : payload.email }, (err, user) =>
        {
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, {
                    email   : user.email,
                    _id     : user._id
                });
            }

            return done(null, false);
        })
    })
);



module.exports = passport;
