const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models/user"); // Import User model

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.BACKENDURL}}/auth/google/callback`,
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

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Retrieve user from the database
    done(null, user); // Pass the user to the done function (no error)
  } catch (err) {
    done(err, null); // Pass the error to the done function (no user)
  }
});
