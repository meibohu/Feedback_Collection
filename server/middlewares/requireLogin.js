//make sure user is logged in
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  next();    //Otherwise, when you call this function, it's going to pass the request to the next middleware in the chain
};
