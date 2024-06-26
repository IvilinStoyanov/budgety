const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("user");
const Category = mongoose.model('categories');

const Categories = require("../config/categories");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/api/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        googleId: profile.id,
        name: profile.name,
        picture: profile._json.picture,
        email: profile._json.email,
        locale: profile._json.locale,
      }).save();

      const userCategories = Categories.map(({ name, icon, color }) => {
        return { name, icon, color, _user: user._id };
      });

      console.log(userCategories);

      // add transaction later as we update multiple documents
      await Category.insertMany(userCategories);

      done(null, user);
    }
  )
);
