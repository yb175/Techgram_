// server.js
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

// Initialize express app
const app = express();

// Debug OAuth credentials
console.log('GitHub Client ID length:', process.env.GITHUB_CLIENT_ID?.length);
console.log('GitHub Client Secret length:', process.env.GITHUB_CLIENT_SECRET?.length);

// Middleware
app.use(cors({ 
  origin: "http://localhost:5000",
  credentials: true 
}));
app.use(express.static(__dirname + "/..")); // Serve static files from parent directory
app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Serialize & deserialize user
passport.serializeUser((user, done) => {
  console.log('Serializing user:', user.id);
  done(null, user);
});
passport.deserializeUser((user, done) => {
  console.log('Deserializing user:', user.id);
  done(null, user);
});

// Google Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    // Yahan user ko database me check/save kar sakte ho
    return done(null, profile);
  }
));

// GitHub Strategy
const GitHubStrategy = require("passport-github2").Strategy;
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    try {
      console.log('GitHub authentication successful for:', profile.username);
      const user = {
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName || profile.username,
        email: profile.emails?.[0]?.value,
        photo: profile.photos?.[0]?.value
      };
      return done(null, user);
    } catch (error) {
      console.error('Error in GitHub strategy:', error);
      return done(error);
    }
  }
));

// Dummy route
app.get("/", (req, res) => res.send("Auth Backend Running"));

// Google OAuth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to index.html
    res.redirect("/index.html");
  }
);

// GitHub auth routes
app.get("/auth/github", (req, res, next) => {
  console.log('Starting GitHub authentication...');
  passport.authenticate("github", { 
    scope: ["user:email"],
    session: true
  })(req, res, next);
});

app.get("/auth/github/callback", (req, res, next) => {
  console.log('Received GitHub callback');
  passport.authenticate("github", {
    failureRedirect: "/pages/login.html",
    failureMessage: true
  })(req, res, (err) => {
    if (err) {
      console.error('Error in GitHub callback:', err);
      return res.redirect("/pages/login.html");
    }
    console.log('GitHub authentication successful, redirecting...');
    res.redirect("/index.html");
  });
});

// Add route to check auth status
app.get("/auth/status", (req, res) => {
  console.log('Auth status:', req.isAuthenticated(), req.user?.username);
  if (req.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: req.user
    });
  } else {
    res.json({
      isAuthenticated: false,
      user: null
    });
  }
});

// Logout route
app.get("/logout", (req, res) => {
  const username = req.user?.username;
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.redirect("/index.html");
    }
    console.log('User logged out:', username);
    res.redirect("/pages/login.html");
  });
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: "Authentication failed",
    message: err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
