const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models/user"); // Import User model

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5174/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let existingUser = await User.findOne({ googleId: profile.id });

        if (!existingUser) {
          // If user does not exist, create a new user
          const newUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            username: profile.displayName, // You can use the displayName or profile.name
            points: 0, // You can initialize points or any other fields as necessary
          });

          await newUser.save();
          return done(null, newUser);
        } else {
          return done(null, existingUser);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id); //stores user information in a session
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user); // retreives user information from session and assigns it to req.user
  });
});
