// middlewares/authMiddleware.js

export const requireAuth = (req, res, next) => {
    console.log(`isLogin : ${req.session.isLogin}\nviews : ${req.session.views}`);
    if (req.session.isLogin) {
      next(); // User is authenticated, proceed to the next middleware/route
    } else {
      res.status(401).json({ error: 'Vous devez être connecté !' });
    }
  };
  
  // Other middleware functions can be defined here as well
  