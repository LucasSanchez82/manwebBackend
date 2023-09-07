// middlewares/authMiddleware.js

export const requireAuth = (req, res, next) => {
    if (req.session.isLogin) {
      next(); // User is authenticated, proceed to the next middleware/route
    } else {
      res.status(401).json({ error: 'Vous devez être connecté !' });
    }
  };
  
  // Other middleware functions can be defined here as well
  